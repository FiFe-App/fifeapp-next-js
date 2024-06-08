'use client'

import { FirebaseContext } from "@/firebase/firebase";
import * as Label from '@radix-ui/react-label';
import { Box, Button, ChevronDownIcon, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { } from 'next/router';
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { LogoFacebook } from "react-ionicons";
import { useSelector } from "react-redux";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import styles from './page_style.module.css';

const Page = () => {
    const router = useRouter();
    
    const containerStyle= {
      alignItems:'center',
      justifyContent:'center',
      flexGrow:1
    }
  
      const handleMoreInfo = () => {
        console.log('more');
        router.push('regisztracio')
      }
    
      return (
        <Flex style={containerStyle}>
          
          <Button onClick={()=>router.push('/')} style={{padding:10,alignSelf:'flex-start'}} variant='ghost' >
              <><ChevronLeftIcon />Rólunk</>
          </Button>
          
          <Flex className={styles.container}>
                <Text className={styles.title}>
                FiFe app
              </Text>
              <Flex direction="row" style={{textAlign:'center',alignItems:'center'}}>      
                <Text className={styles.subTitle}><b>légy közelebb</b></Text>
              </Flex>
              <LoginForm/>
            
          </Flex>
          <Flex style={{alignItems:'flex-end', justifyContent:'flex-end',margin:10,flex:1,zIndex:1}} >
            <Box onClick={handleMoreInfo} style={{borderRadius:8,padding:10}}>
              <Flex style={{alignItems:'center'}}>
                  <Text style={{fontSize:25}}>Regisztrálj!</Text>
                  <ChevronDownIcon/>
              </Flex>
            </Box>
          </Flex>
            
        </Flex>
        
      );
}
const  LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isForgot, setIsForgot] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const context  = useContext(FirebaseContext);
  const user = useSelector((state:any) => state.user)

  const signIn = (email:string, password:string) => {
    console.log('sign in');
    setLoading(true)
    console.log(context);
    context?.api?.login(email,password).then((res:any) => {
      if (res?.success) {
        //router.push('fooldal')
        
        console.log('user',user);
      } else {
        setLoginError(res?.error)
      }
    }).catch((error:any) => {
      console.error(error);
    }).finally(()=>{
      setLoading(false)
    })
    
  }
  useEffect(() => {
    setEmail('');
  }, [isForgot]);

  const sendForgot = (e:SyntheticEvent) => {
    context.api.forgotPassword(email).then((res:any)=>{
      setLoginError(res)
    });
    
  }

  return (
    <Box style={{justifyContent:'center',alignItems:'center',zIndex:1,width:'100%'}}>
      {!isForgot ? <form onSubmit={()=>signIn(email, password)}>
        <Flex style={{flexDirection:'column',flexGrow:1,width:'100%',alignItems:'center'}}>
            <Button color='blue'
              style={{width: '100%'}} onClick={(e)=>{
                e.preventDefault();
                context.api.facebookLogin()
              }}><LogoFacebook style={{fill:'white'}}/> Facebook bejelentkezés</Button>
            <TextField.Root
              size='3'
              className={styles.input_field}
              style={{width:  '100%'}}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email-cím"
              inputMode='email'
              autoComplete='email'
            />
            <TextField.Root
              size='3'
              className={styles.input_field}
              type='password'
              style={{width: '100%'}}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Jelszó"
              autoComplete='password'
            />
          <Button style={{backgroundColor:'#fdcf99',justifyContent:'center',alignItems:'center',margin:5,padding:10,borderRadius:8,width:'100%'}}
            onClick={() => signIn(email, password)} loading={loading} type="submit">
            <Text size='3'>Bejelentkezés!</Text>
          </Button>
          <Button variant="ghost" onClick={()=>setIsForgot(true)} style={{padding:10,borderRadius:8,marginBottom:16,alignSelf:'flex-end'}} >
            <b>Elfelejtettem a jelszavamat!</b>
          </Button>
        </Flex>
      </form>: <form onSubmit={sendForgot}>

      <Flex style={{flexDirection:'column',flexGrow:1,width:'100%',alignItems:'center'}}>
            <Button variant="ghost" onClick={()=>setIsForgot(false)} style={{padding:10,borderRadius:8,marginBottom:16,alignSelf:'flex-start'}} >
              <ChevronLeftIcon/> Bejelentkezés
            </Button>
            <Heading>Elfelejtetted a jelszavad?</Heading>
            <Text>Semmi gond mindenkivel előfordul:)</Text>
            <Label.Root htmlFor="forgotPass">Milyen emaillel regisztráltál be?</Label.Root>
            <TextField.Root
              size='3'
              id="forgotPass"
              className={styles.input_field}
              onChange={(e)=>setEmail(e.target.value)}
              style={{width:  '100%'}}
              placeholder="Email-cím"
              inputMode='email'
              autoComplete="email"
            />
          <Button style={{backgroundColor:'#fdcf99',justifyContent:'center',alignItems:'center',margin:5,padding:10,borderRadius:8,width:'100%'}}
            loading={loading} type="submit">
            <Text size='3'>Email küldése!</Text>
          </Button>
        </Flex>
      </form> }
      {!!loginError && <Box style={{maxWidth:400}} className={styles.error}>
        <Text style={{fontSize:17}} >{loginError}</Text>
      </Box>}
    </Box>
  )
}

export default Page;