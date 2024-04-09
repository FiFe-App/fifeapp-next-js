'use client'

import { FirebaseContext } from "@/firebase/firebase";
import { useWindowSize } from "@/lib/functions";
import { Flex, Button, Text, TextField, Box, Spinner } from "@radix-ui/themes";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import {  } from 'next/router'
import { useContext, useState } from "react";
import { ChevronBack, ChevronDownOutline, LogoFacebook } from "react-ionicons";
import { useSelector } from "react-redux";

import styles from './page_style.module.css';

const Page = () => {
    const { width, height } = useWindowSize();
    const router = useRouter();
    const small = useWindowSize().width<900;
    const segments = useParams();
    const [canLogin, setCanLogin] = useState(segments || false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const {app, auth, user, api}  = useContext(FirebaseContext);
    const [scrollBox, setScrollBox] = useState<HTMLElement|null>(null);
  
    
    const containerStyle= {
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: 'rgb(253, 249, 229)',
      flexGrow:1
    }
  
      const handleMoreInfo = () => {
        console.log('more');
        if (width <= 900)
          router.push('regisztracio')
      }
    
      return (
        <Flex style={containerStyle}>
          
        <Flex direction='row' onClick={()=>router.push('/')} style={{padding:10,alignSelf:'flex-start'}} variant='ghost' >
            <><ChevronBack />Rólunk</>
        </Flex>
          
        <Flex style={{backgroundColor:'#fdf4c8',borderRadius:50,padding:small?30:50,paddingTop:0,margin:5,marginTop:20,maxWidth:'95%',alignItems:'center'}}>
            {width >= 900 ?
              <Text style={{fontSize:170,color:'black'}}>
              FiFe app
            </Text>
            :
            <Text style={{fontSize:70, color:'black',textAlign:'center',flex:1}}>
              FiFe app
            </Text>
            }
            <Flex direction="row" style={{paddingLeft:small?0:30,paddingRight:small?0:30,textAlign:'center',alignItems:'center'}}>      
              <Text style={{fontSize:small?17:40}}><b>légy közelebb</b></Text>
            </Flex>
            <LoginForm/>
            
          </Flex>
          <Flex style={{alignItems:'flex-end', justifyContent:'flex-end',margin:10,flex:1,zIndex:1}} >
            <Box onClick={handleMoreInfo} style={{borderRadius:8,padding:10}}>
              <Flex style={{alignItems:'center'}}>
                  <Text style={{fontSize:25}}>Regisztrálj!</Text>
                  <ChevronDownOutline/>
              </Flex>
            </Box>
          </Flex>
            
        </Flex>
        
      );
}
const  LoginForm = () => {
  const { width } = useWindowSize();
  const small = width<900;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [loginError, onChangeLoginError] = useState(null);
  const context  = useContext(FirebaseContext);
  const user = useSelector((state:any) => state.user)

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
    <Box style={{justifyContent:'center',alignItems:'center',zIndex:1,width:'100%'}}>
      <form onSubmit={()=>signIn(username, password, onChangeLoginError)}>
        <Flex style={{flexDirection:'column',flexGrow:1,width:'100%',alignItems:'center'}}>
            <Button color='blue'
              style={{width: '100%'}} onClick={(e)=>{
                e.preventDefault();
                context.api.facebookLogin()
              }}><LogoFacebook color='white'/> Facebook bejelentkezés</Button>
            <TextField.Root
              size='3'
              className={styles.input_field}
              style={{width:  '100%'}}
              onChange={(e)=>onChangeUsername(e.target.value)}
              placeholder="Email-cím"
              inputMode='email'
            />
            <TextField.Root
              size='3'
              className={styles.input_field}
              type='password'
              style={{width: '100%'}}
              onChange={(e)=>onChangePassword(e.target.value)}
              placeholder="Jelszó"
            />
          <Button style={{backgroundColor:'#fdcf99',justifyContent:'center',alignItems:'center',margin:5,padding:10,borderRadius:8,width:'100%'}}
            onClick={() => signIn(username, password, onChangeLoginError)} loading={loading} type="submit">
            <Text size='3'>Bejelentkezés!</Text>
          </Button>
        </Flex>
      </form>
      {!!loginError && <Box style={{...styles.error,maxWidth:small?400:600}}>
        <Text style={{fontSize:17}} >{loginError}</Text>
        <Button onClick={forgot} style={{padding:10,borderRadius:8,marginTop:16,alignSelf:'center'}} 
         
        ><b>Elfelejtettem a jelszavamat!</b></Button>
      </Box>}
    </Box>
  )
}

export default Page;