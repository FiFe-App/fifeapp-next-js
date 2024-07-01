"use client"

import axios from 'axios';
import { get, getDatabase, ref, set } from 'firebase/database';
import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../firebase/authConfig';
import { FirebaseContext } from '../../firebase/firebase';
import { categories } from '../../lib/categories';
import { getNameOf, listToMatrix, useWindowSize } from '../../lib/functions';
import { TextFor, elapsedTime, getGreeting } from '../../lib/textService/textService';
import styles from '../../styles/homeDesign';
import { removeUnreadMessage, setSettings as setStoreSettings, setTempData, setUnreadMessage } from '../../lib/userReducer';

import BasePage from '../../components/BasePage';
import { Box, Button, Flex, IconButton, Text } from '@radix-ui/themes';
import { Auto } from '@/components/Auto';
import { Notifications, NotificationsOutline } from 'react-ionicons';
import Module from '@/components/Module';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Error from '@/components/Error';

interface ErrorType {
  error: any
}

  const HomeScreen = () => {
    const name = useSelector((state:any) => state.user.name)
    const uid = useSelector((state:any) => state.user.uid)
    const dispatch = useDispatch()
    const router = useRouter();
    const opacity = 1
    const [searchText, setSearchText] = useState('');
    const [textWidth, setTextWidth] = useState(0); 
    const { width } = useWindowSize();
    const small = width < 900;
    const [greeting, setGreeting] = useState(getGreeting);
    const [docsList, setDocsList] = useState([]);
    const [mailModal, setMailModal] = useState<any>(null);
    const [list, setList] = useState<Array<any>|ErrorType>([null,null,null,null,null,null]);
    const [number, setNumber] = useState(0);
    const [filter, setFilter] = useState({
      newPeople: true,
      news: true,
      places: true,
      saleSeek: true,
      saleGive: true,
      rentSeek: true,
      rentGive: true,
      workSeek: true,
      workGive: true,
      
    });


    const {database} = useContext(FirebaseContext);

    useEffect(() => {
        
        dispatch(setTempData(null))
        const filterRef = ref(getDatabase(),'/users/'+uid+'/settings/homeFilter')
        get(filterRef).then(snapshot=>{
          if (snapshot.exists())
          setFilter(snapshot.val())
          else 
          setFilter({
            newPeople: true,
            news: true,
            places: true,
            saleSeek: true,
            saleGive: true,
            rentSeek: true,
            rentGive: true,
            workSeek: true,
            workGive: true,
            
          })
        }).catch(err=>{
          setFilter({
            newPeople: true,
            news: true,
            places: true,
            saleSeek: true,
            saleGive: true,
            rentSeek: true,
            rentGive: true,
            workSeek: true,
            workGive: true,
          })
          
        }).finally(()=>{
          loadData();
        })

    }, []);


    useEffect(() => {
      console.log(list);
    }, [list]);

    const loadData = () => {
      console.log('load latest', filter);
      if (!Object.entries(filter).length) return 
      setList([null,null,null,null,null,null]);
      axios.get('/all/latest',{...config(),params:filter}).then(res=>{
        setList(Object.values(res.data.latest))
        setNumber(res.data.notifications)
      }).catch(err=>{
        setList({error:err})
      })
    }

    useEffect(() => {
      if (mailModal == true)
      axios.get('all/notifications',config()).then(async (res)=>{
        const data = await Promise.all(res.data.map(async ({uid,author,id,created_at}:any)=>{
          const name = await getNameOf(uid||author)
          return {
            text: author?
            'Szuper! '+name+' érdeklődik csereberéd iránt!'
            :'Jó hír! '+name+' bejelölt a pajtásának!',
            uid:author||uid,
            created_at:elapsedTime(created_at)
          }
        }))
        setMailModal(data)
      })
    }, [mailModal]);


    const modals = <>

          
          {/*<HelpModal 
            title="Értesítések"
            actions={[
              {title:'bezár',onClick:()=>setMailModal(false)}
            ]}
            open={mailModal}
            setOpen={setMailModal}
            inputs={
              mailModal?.length ?
              mailModal?.map((e,i)=>{
                return {type:'item',attribute:e.uid,label:e.text,text:e.created_at,setData:()=>{setMailModal(false)}}
              }) : []
            }
          />
          <MessageModal/>
          <StressModal/>*/}
    </>

    return (
      <BasePage full style={{paddingHorizontal:0,padding:0}}>
        <>
          {!uid && !!small && <Flex direction='row' style={{alignItems:'center',justifyContent:'center',padding:12}}>
            <Button title="Bejelentkezés" onClick={()=>router.push('/bejelentkezes')}/>
            <Button title="Csatlakozz!" variant='solid' onClick={()=>router.push('/regisztracio')}/>
          </Flex>}
              {true&&<Stickers style={{flex:1}}/>}
          <Flex direction='row' style={{flex:3,zIndex:0,justifyContent:'center'}}>
            <Flex style={{flex:width<=900?1:2,alignItems:'center',}}>
              <Flex style={{opacity:opacity,flex:opacity}}>
                {<Flex direction='row' style={{alignItems:'center',textAlign:'center',opacity:textWidth}}>
                  <Text
                  style={{fontSize:small?14:20,marginRight:30,backgroundColor:'white',fontWeight:'300',borderRadius:100,padding:16,paddingLeft:32,paddingRight:32}}>
                    <TextFor text={greeting} embed={name}/>
                  </Text>
                  <Flex style={{...styles.bubble,marginLeft:textWidth-5}} />
                  <Smiley style={{marginTop:32,marginLeft:10}}/>
                </Flex>}
              </Flex> 
            </Flex>
            {!!uid&&<Auto style={{padding:10,alignItems:'center',justifyContent:'center',zIndex:-1,width:'auto',flex:undefined}} >
              <Flex>

                <IconButton onClick={()=>setMailModal(true)}
                >
                {number? <Notifications />: <NotificationsOutline />}
                </IconButton>
                {!!number && <Text style={{
                  position:'absolute',top:0,right:0,
                  borderRadius:10,color:'white',backgroundColor:'black',width:20,height:20,alignItems:'center',textAlign:'center'}}>
                {number}
                </Text>}
              </Flex>
            </Auto>}
          </Flex>
        </>
          <Flex style={{zIndex:-1}}>
            {
              "error" in list ?
              <Error text={list?.error?.response?.data}/>
              :
              <>{width > 900 ? <>
              <Flex>
                {listToMatrix(list,2).map((row,i)=>{
                  return <Flex direction='row'  key={'module'+i}>
                    {row.map((e,i2)=><Module key={'moduleRow'+i2} data={e} />)}
                  </Flex>
                })}
              </Flex>
            </> : <Flex style={{alignItems:'center'}}>
                  {list.map((e,i)=><Module key={'modulerow'+i} data={e} />)}
            </Flex>}</>}
          </Flex>
          {(typeof list == 'string') && list?.[0] && false && <Flex style={{alignItems:'center',flex:1,margin:32}}>
            <Smiley/>
            <Text>Vége a találatoknak</Text>
          </Flex>}
          {!!uid && modals}
      </BasePage>
    );
  }

const Stickers = ({style}:any) => {

const [notifications, setNotifications] = useState<Array<any>>([]);
const {database, app, initMessaging} = useContext(FirebaseContext);
const navigator = useRouter()
const uid = useSelector((state:any) => state.user.uid)
const user = useSelector((state:any) => state.user)
console.log('user',user);
const allMessages = useSelector((state:any) => state.user.unreadMessage)
const dispatch = useDispatch()

const handleClose = (n:any) => {
  if (n.link)
    navigator.push(n.link,n.params)
  if (n?.press) {
    console.log('press');
    n.press()
  }
    //setPopups(popups.filter((p,i)=>i!=index))
  console.log('remove');
}

useEffect(() => {
  
  if (database) {
    const dbRef = ref(database,`users/${uid}/messages`);
    const userRef = ref(database,'users');

    console.log('onChilAdded attatched');

    const getMessages = () => {
      //dispatch(emptyUnreadMessages())
      console.log('allMessages',allMessages);
      if (allMessages.includes('notifications')) {
        setNotifications(old=>[...old,{
          press: initMessaging,
          title:'Értesítések',
          key:'notifications',
          text:'Hali! Ha szeretnéd, hogy értesülj a pajtásaid üzeneteiről, kapcsold be az értesítéseket, úgy, hogy rám kattintasz!'
        }])
      }

    } 
    getMessages()
  }
  
  try {
    if (Notification.permission === 'default') {
      dispatch(setUnreadMessage('notifications'))
    } else {
      dispatch(removeUnreadMessage('notifications'))
    }
  } catch (error) {
    console.log('Notification not working');
  }
}, []);

useEffect(() => {
  try {
    if (Notification.permission !== 'default')
    setNotifications(notifications.filter(n=>n.key!='notifications'))
  } catch (error) {
    console.log('Notification not working');
  }
}, [allMessages]);

return (
  !!notifications.length && <Flex style={style}>
      {notifications.map(
        (n,i)=>
          <Sticker key={'sticker'+i} onClick={()=>handleClose(n)}>
            <b>{n.title}</b>
            {' '+n?.text}
          </Sticker>)}
  </Flex>
)
}

  const Sticker = ({children,onClick}:any) => {
    const getRandom = (min:number, max:number) => Math.floor(Math.random()*(max-min+1)+min);

    const width = 300;

    const ref = useRef(null);
    return(
      <Flex ref={ref} style={{
        flex:1}}>
        <Box onClick={onClick} style={{
          backgroundColor:'#fdf6d1',borderWidth:0,padding:10,
          width:'100%'}}>
          <Text>{children}
          </Text>
        </Box>
      </Flex>
    )
  } 

  export const Smiley = ({style}:any) => {
    
    return <Image src={require('../../assets/logo.png')} alt="" style={{width:50,height:50,zIndex:10}}/>
    
  }



  export const isBright = function(color:string) { // #FF00FF
    var textCol = 'black';
    var c = color.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 150) {
        textCol = 'white';
    }

    return textCol;
  }

export default HomeScreen;