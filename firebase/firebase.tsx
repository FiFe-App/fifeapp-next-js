'use client'

// firebase.js
// contains the Firebase context and provider

import {
    FacebookAuthProvider,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    getAuth,
    inMemoryPersistence,
    initializeAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import React, { PropsWithChildren, ReactNode, createContext, useEffect, useState } from 'react'
import firebaseConfig from './firebaseConfig'

import { getApp, initializeApp } from 'firebase/app'
import { get, getDatabase, ref, set } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import {
    removeUnreadMessage,
    setName,
    setSettings,
    setUserData,
    login as sliceLogin,
    logout as sliceLogout,
} from '../lib/userReducer'

import axios from 'axios'
import { deleteToken, getMessaging, getToken } from 'firebase/messaging'
import { config } from './authConfig'

import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import router from 'next/router'

const FirebaseContext = createContext<any>(null)
export { FirebaseContext };

const Ctx = ({ children }:{children:ReactNode}) => {
    const dispatch = useDispatch()
    const [messaging, setMessaging] = useState<any>(null);
    const uid = useSelector((state:any) => state.user.uid);

    const app = () => {
        let app;
        try {
            app = getApp()
        } catch (error) {
            app = initializeApp(firebaseConfig)
        }
        try {
            //initializeAuth(app())
        } catch (error) {
          console.log(error);  
        }
        return app;
    }

    useEffect(() => {

        init()        
    }, []);
    const init = async () => {
        if (true) {

            console.log('INIT');

            // Initialize Firebase
            initializeApp(firebaseConfig);
            appCheck()

            // Adding listener for firebase auth
            const unsubscribe = onAuthStateChanged(getAuth(),async (user) => {
            if (user) {
                console.log('FIREBASE user already loggen in')
                console.log(user);
                user.reload().then(res=>{
                    console.log('reload',res);
                    dispatch(sliceLogin(user.uid))
                })
            } else {
                console.log('FIREBASE user not logged in')
                //dispatch(sliceLogout())
            }
            });

            return unsubscribe
        }
    }

    const initMessaging = async () => {

        const messaging = getMessaging();
        const db = getDatabase()
        console.log('msg init'); 

        try {
            if (!('Notification' in window)) return;

            await Notification.requestPermission().then((permission) => {
                console.log(permission);
            if (permission !== 'granted') {
                dispatch(removeUnreadMessage('notification'))
            } else {
                setMessaging(messaging);
                getToken(messaging, { 
                    vapidKey: 'BInTt__OonGUhBNBdQA57cu-VRHBm6N7vcsJBe_Q3o1Ei_2UgPSfM0ZzxyXsxohdrV_qooAywYzRilIv5OJ6VQE' ,
                    //serviceWorkerRegistration: ''
                }).then((currentToken) => {
                if (currentToken) {
                    console.log(currentToken);
                    console.log(uid);
                    set(ref(db,'/users/'+uid+'/data/fcm'),{token:currentToken}).catch(err=>{
                        console.log(err);
                    }).then(res=>{
                        console.log(res);
                    })
                } else {
                    // Show permission request UI
                    //alert('Valami miatt nem lehet neked üzeneteket küldeni, talán le van tiltva a szolgáltatás?')
                    console.log('No registration token available. Request permission to generate one.');
                    // ...
                }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    //alert('Valami miatt nem lehet neked üzeneteket küldeni, talán le van tiltva a szolgáltatás?')
                // ...
                });
            }
            }).catch(err=>{
                console.error(err);
            })
        } catch (e) {
            console.log('notification error',e);
        } 
    }

    const appCheck = () => {

        return;
        // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
        // key is the counterpart to the secret key you set in the Firebase console.
        try{const appCheckObj = initializeAppCheck(getApp(), {
        provider: new ReCaptchaV3Provider('6LcSls0bAAAAAKWFaKLih15y7dPDqp9qMqFU1rgG'),

        // Optional argument. If true, the SDK automatically refreshes app Check
        // tokens as needed.
        isTokenAutoRefreshEnabled: true
        });}catch(err){
            console.log('appcheck',err);
        }
    }

    const forgotPassword = async (email:string) => {
        const retApp = getApp()
        const a = getAuth(retApp)
        if (!email || email == '') return 'Email nélkül nem tudjuk visszaállítani a jelszavad'
        return sendPasswordResetEmail(a,email).then(res=>{
            return 'Küldtünk egy emailt, amivel vissza tudod állítani a fiókodat a rendes kerékvágásba!\n(Nézd meg a spam mappát is!)'
        }).catch(err=>{
            console.log(err);
            console.log(err.code);
            if (err.code == 'auth/invalid-email')
                return 'Ez az email-cím nem szerepel a rendszerben:(';
            return 'Aj-aj hiba történt! Próbáld meg később légyszi'
        })
    }

    const logout = () => {
        console.log('logout1');
        signOut(getAuth());
        const msg = getMessaging()
        if (msg) {
            deleteToken(msg).then(e=>console.log('token deleted?',e))
            .catch(err=>console.error(err))
            .finally(()=>{
                dispatch(sliceLogout())
            })
        }
    }
//init()
    const login = async (email:string, password:string, firstLogin:any) => {
        let newEmail = email
        let newPass = password
        let response = null

        await getAuth().setPersistence(browserSessionPersistence).then(async ()=>{

            await signInWithEmailAndPassword(getAuth(getApp()), newEmail, newPass)
            .then(async (userCredential) => {
                const user = userCredential.user
                await user.getIdToken(false).then(token=>{
                    console.log(token);

                    dispatch(setUserData({
                        authtoken:token,
                        email:user.email,
                        emailVerified:user.emailVerified,
                        providerData:user.providerData,
                        createdAt:user.metadata.creationTime,
                        lastLoginAt:user.metadata.creationTime
                    }))
                })

                if (firstLogin) {
                    const user = getAuth(getApp()).currentUser;
                    console.log(user);
                    if (user == null) {
                        console.log('USER NULL');
                        return
                    }
                    console.log('set',`users/${user.uid}/data`,firstLogin);
                    try{
                        await axios.post('users',firstLogin,config()).then(()=>{
                            response = {success:true,user}
                        })
                        await set(ref(getDatabase(),`users/${user.uid}/data/name`),firstLogin.name).then(()=>{
                            console.log('RTDB updated');
                        })
                        await set(ref(getDatabase(),`users/${user.uid}/settings/homeFilter`),firstLogin.interest).then(()=>{
                            console.log('RTDB updated');
                        })
                        //response = {success:true,user}
                    } catch (err) {
                        console.log('ERROR',err);
                    }
                    dispatch(setName(firstLogin.name))
                } else {
                const dbRef = ref(getDatabase(getApp()),'users/' + user.uid + '/settings');
                get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(setSettings(snapshot.val()))
                }

                })
                const nameRef = ref(getDatabase(getApp()),'users/' + user.uid + '/data/name');
                get(nameRef).then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(setName(snapshot.val()))
                    console.log(snapshot.val());
                }

                })
            }
                router.push('/')
                response = {success:true}
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(error);

                if (errorCode == 'auth/invalid-email' || errorCode == 'auth/user-not-found')
                    response = {error:'Bakfitty! Nem jó az email cím, amit megadtál!'};
                else if (errorCode == 'auth/internal-error')
                    response = {error:'Azáldóját! A szerveren hiba történt, próbáld újra!'};
                else if (errorCode == 'auth/wrong-password')
                    response = {error:'Azt a hét meg a nyolcát! Lehet elírtad a jelszavad.'};
                else if (errorCode == 'auth/too-many-requests')
                    response = {error:'Ó te jó ég! Túl sokszor próbáltál bejelentkezni, próbálkozz később!'};
                else
                    response = {error:'error: ' + errorCode + ' - ' + errorMessage};
            });
        })

        return response

    }

    const register = async (email:string,password:string,data:any) => {
        let response = null
        const auth = getAuth();
        console.log('register',data);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                console.log('signed in as ',userCredential.user.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == 'auth/invalid-email')
                    response = {error:'Nem jó az email, amit megadtál :('};
                else if (errorCode == 'auth/weak-password')
                    response = {error:'A jelszavad nem elég bonyi\nlegyen legalább 6 karakter'};
                else if (errorCode == 'auth/wrong-password')
                    response = {error:'Rossz jelszavat adtál meg :/'};
                else
                    response = {error:'error: ' + errorCode + ' - ' + errorMessage};
                console.log(response);
            });
            try {
                const LoginRes = await login(email,password,data);
                console.log('loginRes',LoginRes);
            } catch (err) {
                console.log('set error',err);
            }
        return response
    }

    const facebookLogin = async () => {
        const auth = getAuth();
        let response = null
        auth.languageCode = 'hu';
        console.log('fb-login');
        const provider = new FacebookAuthProvider();
        await signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                dispatch(sliceLogin(result.user.uid))

                response = {success:true}

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential?.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                //const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                response = {error:'error: ' + errorCode + ' - ' + errorMessage};
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    var pendingCred = error.credential;
                    var email = error.email;
                    // Get sign-in methods for this email.
                    fetchSignInMethodsForEmail(auth,email).then(function(methods) {
                      // Step 3.
                      // If the user has several sign-in methods,
                      // the first method in the list will be the "recommended" method to use.
                      if (methods[0] === 'password') {
                        // Asks the user their password.
                        // In real scenario, you should handle this asynchronously.
                        var password = 'password'//promptUserForPassword(); // TODO: implement promptUserForPassword.
                        signInWithEmailAndPassword(auth,email, password).then(function(result) {
                          // Step 4a.
                          //return result.user.linkWithCredential(pendingCred);
                        }).then(function() {
                          // Facebook account successfully linked to the existing Firebase user.
                          response = {success:true}
                        });
                        return;
                      }
                      response = {error:'facebook login error'}
                    });
                  }

                // ...
            });
        return response;
    }

    return (
        <FirebaseContext.Provider 
        value={{
            app:app(),
            auth:getAuth(app()),
            database:getDatabase(app()),
            api:{login,register,facebookLogin,logout,forgotPassword},
            messaging,
            initMessaging
        }}>
            {children}
        </FirebaseContext.Provider>
    )

}

export default Ctx;
