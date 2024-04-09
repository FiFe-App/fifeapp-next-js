import React, { useContext, useEffect, useState } from 'react';
import { Animated, Button, Dimensions, Easing, Pressable, ScrollView, StyleSheet, View } from 'react-native';
// routes

import { styles } from '../../styles/styles';

// fonts
import { AmaticSC_700Bold, useFonts } from '@expo-google-fonts/amatic-sc';
import { Raleway_800ExtraBold } from '@expo-google-fonts/raleway';

import { LinearGradient } from 'expo-linear-gradient';
import { Helmet } from 'react-helmet';
import { useWindowDimensions } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { Auto, B, MyText, NewButton, Row, TextInput } from '../../components/Components';
import { FirebaseContext } from '../../firebase/firebase';
import First from '../first/First';
import { equalTo, get, query, ref } from 'firebase/database';
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import { router, usePathname, useSegments } from 'expo-router';


const LoginScreen = () => {
  const { width } = useWindowDimensions();
  const small = useWindowDimensions().width<900;
  const segments = useSegments();
  const [canLogin, setCanLogin] = React.useState(segments || false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const {app, auth, user, api}  = useContext(FirebaseContext);
  const height = Dimensions.get('window').height;
  const [scrollView, setScrollView] = useState(null);

  
  const containerStyle= {
    alignItems:'center',
    justifyContent:'center',
    height:useWindowDimensions().height,

    backgroundColor: '#fff',
  }

    const handleMoreInfo = () => {
      console.log('more');
      if (width <= 900)
        router.push('regisztracio')
      else
        scrollView.scrollToEnd(true)
    }
  
    let [fontsLoaded] = useFonts({
      AmaticSC_700Bold, Raleway_800ExtraBold
    });
    return (
      (fontsLoaded) &&
      <ScrollView 
      ref={ref=>{setScrollView(ref)}}
      pagingEnabled={true}
      scrollsToTop={false}
      scrollEventThrottle={100}
      automaticallyAdjustContentInsets={false}
      directionalLockEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>

      <Helmet>
        <title>Bejelentkezés</title>
      </Helmet>
      <LinearGradient colors={['#fdf9e5', '#fdf9e5']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={containerStyle}>
        
      <NewButton title={<><Icon name="chevron-back" size={25}/>Rólunk</>} onPress={()=>router.push('rolunk')} style={{padding:10,alignSelf:'flex-start'}} textStyle={{fontSize:25}} color='#fdf9e5'/>
        
      <View style={[{backgroundColor:'#fdf4c8',borderRadius:50,padding:small?30:50,paddingTop:0,margin:5,marginTop:20,maxWidth:'95%',alignItems:'center'}]}>
          {width >= 900 ?
            <MyText style={{fontSize:170, fontFamily:'AmaticSC_700Bold',color:'black'}}>
            fife app
          </MyText>
          :
          <MyText style={{fontSize:70, fontFamily:'AmaticSC_700Bold',color:'black',textAlign:'center',flex:1}}>
            fife app
          </MyText>
          }
          <Row breakPoint={400} style={{paddingHorizontal:small?0:30,textAlign:'center',alignItems:'center'}}>      
            <MyText style={{fontSize:small?17:40}}><B>légy közelebb</B></MyText>
          </Row>
          <LoginForm/>
          
        </View>
        <View style={{alignItems:'flex-end', justifyContent:'flex-end',margin:10,flex:1,zIndex:-1}} >
          <TouchableRipple onPress={handleMoreInfo} style={{borderRadius:8,padding:10}}>
            <View style={{alignItems:'center'}}>
                <MyText style={{fontSize:25}}>Regisztrálj!</MyText>
                <Icon name="chevron-down-outline" size={25}/>
            </View>
          </TouchableRipple>
        </View>
      </LinearGradient>
      {width > 900 &&
        <View style={{height:'100%',backgroundColor:'#fcf3d4'}}>
          <First scrollView={scrollView}/>
        </View>}
      </ScrollView>
      
    );
  };


const  LoginForm = () => {
  const { width } = useWindowDimensions();
  const small = useWindowDimensions().width<900;
  const router = usePathname();
  const [loading, setLoading] = useState(false);
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [loginError, onChangeLoginError] = React.useState(null);
  const context  = useContext(FirebaseContext);
  const user = useSelector((state) => state.user)

  const signIn = (email, password, printMessage) => {
    console.log('sign in');
    setLoading(true)
    console.log(context);
    context?.api?.login(email,password).then((res) => {
      if (res?.success) {
        //router.push('fooldal')
        
        console.log('user',user);
      } else {
        onChangeLoginError(res?.error)
      }
    }).catch((error) => {
      console.error(error);
    }).finally(()=>{
      setLoading(false)
    })
    
  }

  const forgot = () => {
    router.push('elfelejtett-jelszo')
  }

  return (
    <View style={{justifyContent:'center',alignItems:'center',zIndex:-1,width:'100%'}}>
      <View style={{flexDirection:'column',flexGrow:1,width:'100%'}}>
          <TextInput
            style={[styles.searchInput,{width: width <= 900 ? 200 : '100%',WebkitBoxShadow: '0 0 0 30px white inset'} ]}
            onChangeText={onChangeUsername}
            editable
            placeholder="Email-cím"
            inputMode='email'
          />
          <TextInput
            style={[styles.searchInput,{width: width <= 900 ? 200 : '100%',WebkitBoxShadow: '0 0 0 30px white inset'} ]}
            onChangeText={onChangePassword}
            editable
            textContentType="password"
            secureTextEntry
            placeholder="Jelszó"
            onSubmitEditing={()=>signIn(username, password, onChangeLoginError)}
          />
        <Pressable style={{backgroundColor:'#fdcf99',justifyContent:'center',alignItems:'center',margin:5,padding:10,borderRadius:8,width:'100%'}} 
          onPress={() => signIn(username, password, onChangeLoginError)}>
          {!loading ?
          <MyText bold size={17}>Bejelentkezés!</MyText>
          :<ActivityIndicator color="#fdf9e5"/>}
        </Pressable>
      </View>
      {!!loginError && <View style={[styles.error,{maxWidth:small?400:600}]}>
        <MyText style={{fontSize:17}} >{loginError}</MyText>
        <NewButton onPress={forgot} color='#ffffff' style={{padding:10,borderRadius:8,marginTop:16,alignSelf:'center'}} 
          title={<B>Elfelejtettem a jelszavamat!</B>} textStyle={{fontSize:16}}
        />
      </View>}
    </View>
  )
}
export const RegisterForm = ({setData,dataToAdd,style}) => {
  const router = usePathname();
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [passwordAgain, onChangePasswordAgain] = React.useState('');
  const [loginError, onChangeLoginError] = React.useState('');
  const {app, auth, user, api}  = useContext(FirebaseContext);
  const width = useWindowDimensions().width

  useEffect(() => {
    console.log(dataToAdd);
  }, [dataToAdd]);

  const signUp = (email, password, printMessage) => {
    console.log('sign in');

    api.register(email,password,dataToAdd).then((res) => {
      console.log('res',res);
      if (res?.success) {
        api.login(email,password,true)
        //setData(true)
      } else {
        onChangeLoginError(res?.error)
      }
    }).catch((error) => {
      console.error('error',error);
    })
    
  }
  const fbLogin = () => {
    api.facebookLogin().then((res) => {
      console.log('res',res);
      if (res?.success) {
        router.push('/') 
      } else {
        onChangeLoginError(res?.error)
      }
    }).catch((error) => {
      console.error('error',error);
    })
  }
  return (
    <View style={[{flex:width <= 900 ? undefined : 1,alignItems:'flex-start',maxWidth:500,width:'100%'},style]}>
        <MyText style={styles.text}>Email-cím</MyText>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeEmail}
          editable
          placeholder="email@gmail.com"
        />
        <MyText style={styles.text}>Jelszó</MyText>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangePassword}
          editable
            textContentType="password"
            secureTextEntry
            placeholder="***************"
        />
        <MyText style={styles.text}>Jelszó újra</MyText>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangePasswordAgain}
          editable
            textContentType="password"
            secureTextEntry
            placeholder="***************"
        />
        {!!loginError&&<MyText style={styles.error} >{loginError}</MyText>}
        <NewButton style={[styles.headline,{alignSelf:'flex-end'}]} title="Regisztráció befejezése!" disabled={password != passwordAgain || password == ''} color="#fdcf99" onPress={() =>
          signUp(email,password)
        } />
      
      {false&&
      <Button title="Facebook Bejelentkezés"  onPress={fbLogin} color="#4267B2"/>}
    </View>
  )
}

export const MoreInfoForm = ({setData,style}) => {
  const router = usePathname();
  const [name, onChangeName] = useState('');
  const [username, onChangeUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState(true);
  const [bio, onChangeBio] = useState('');
  const {database}  = useContext(FirebaseContext);
  const width = useWindowDimensions().width

  useEffect(() => {
    if (database) {
      if (username && username.length > 3 && username.length < 20 && username.match(/^([a-z0-9_])*$/)) {
        const usernameRef = query(ref(database, 'usernames'), equalTo(null,username.toLowerCase()))
        get(usernameRef).then(snapshot=>{
          console.log(snapshot.val());
          if (snapshot.exists() && snapshot.val()[username]) {
            setUsernameValid(false)
          } else setUsernameValid(true)
        })
      } else setUsernameValid(false)
    } 
  }, [username]);

  useEffect(() => {
    setData({name:name.trim(),bio,username:usernameValid?username:null})
  }, [name,bio,username,usernameValid]);
  return (
    <View style={[{flex:width <= 900 ? undefined : 1,alignItems:'flex-start',maxWidth:500,width:'100%'},style]}>
        <MyText style={styles.text}>A Neved</MyText>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeName}
          editable
          placeholder="Fiatal Felnőtt"
        />
        <MyText style={styles.text}>Az egyedi felhasználóneved</MyText>
        <View style={[{flexDirection:'row',width:'100%'}]}>
            <Icon style={{position:'absolute',alignSelf:'center',top:10,left:10}} name={usernameValid ? 'checkmark-circle' : 'close-circle'} size={30} color={'#fdcf99'}/>
            <TextInput
              style={[styles.searchInput,{paddingLeft:50,marginRight:0}]}
              onChangeText={onChangeUsername}
              editable
              placeholder="fifevok69420"
            />
          </View>
            {!usernameValid && !!username && <MyText style={[localStyle.label,{color:'#fdcf99'}]}>Nem lehet ez a felhasználóneved!</MyText>}

    </View>
  )
}

const Loading = () => {
  const spinValue = new Animated.Value(0);

    // First set up animation 
    Animated.loop(
      Animated.timing(
        spinValue,
        {
         toValue: 1,
         duration: 600,
         easing: Easing.linear,
         useNativeDriver: false
        }
      )
     ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (<Animated.View
    style={{transform: [{rotate: spin}] }}>
      <MyText bold size={17}>Bejelentkezés</MyText>
    </Animated.View>)
} 

const localStyle = StyleSheet.create({
  title: {
    fontFamily: 'Raleway_800ExtraBold',
    fontSize:'4.0vw', 
    marginHorizontal:27,
    color:'black',
    alignItems:'center'
  }
})

export default LoginScreen
