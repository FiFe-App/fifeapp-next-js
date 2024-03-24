"use client"

import { Auto } from "@/components/Auto";
import BasePage from "@/components/BasePage";
import { NewButton } from "@/components/NewButton";
import { Row } from "@/components/Row";
import { Smiley } from "@/components/Smiley";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";
import styles from "@/styles/aboutDesign";
import ErrorBoundary from "@/components/ErrorHandling";
import { MyText } from "@/components/MyText";
import AuthoredImage from "@/components/AuthoredImage";
import Comments from "@/components/firebase/Comments";

const About = () => {
    const small = false//useWindowDimensions().width <= 900;
    //const db = getDatabase()
    const navigation = router;
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    //let [fontsLoaded] = useFonts({       AmaticSC_700Bold, Raleway_800ExtraBold});
    const handleSend = async () => {
        if (email) {
            const newPostRef = push(ref(db,'about/emails'))
            set(newPostRef ,{
                email
            })
            .then(res=>{
                console.log(res);
                setEmail('')
                setSent(true);
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    const next = () => {
        console.log('next');
        navigation.push('/');
        //localStorage.setItem('login',true)
    }
    return (
    <BasePage style={{padding:0,paddingHorizontal:0}} full>
        <div style={{marginLeft:small?0:100,marginRight:small?0:100}}>
            <div className="container">
                    <Row style={{alignItems:'center',textAlign:'center'}}>
                        <Smiley style={{margin:32}}/>
                        <div style={{flex:1}}>
                            <MyText size={50}>FiFe App</MyText>
                            <MyText size={30} style={{marginTop:-8}}>A biztonságos online tér</MyText>
                        </div>
                    </Row>
                    <MyText style={{textAlign:'left',fontSize:17}}>{'\n'}
                        A mai elszigetelt világban szükség van egy olyan rendszerre, amely összehozza a jóérzésű embereket egy biztonságos közösségbe.
                                        {'\n'}Ez a gondolat ihlette a <b>Fiatal Felnőttek applikációt</b>, amely sokrétű online felületet nyújt a nagyvárosban élőknek.
                    </MyText>
            </div>
            <Auto style={{flex:undefined,alignItems:'center',justifyItems:'center'}}>
                <MyText contained style={{flexGrow:1,marginBottom:20,order:small?3:0}}>
                    <MyText title>Cserebere</MyText>{'\n'}
                    Egy egyszerű adok-veszek oldal, ahol keresgélhetsz illetve hirdethetsz eladó tárgyak, munkák, kiadó lakások közt. Ezeket a cikkeket le tudod foglalni, és chatelni a hirdetővel.
                    {'\n'}
                    <div style={{width:'100%',alignItems:'center'}}>
                        <NewButton  title='Megyek csereberélni!' color='#fdcf99' />
                    </div>
                </MyText>
                <AuthoredImage authorName="Vitányi Regina"
                 src={require('@/assets/img-prof.jpg')} resizeMode="contain" style={{height:200,width:200,margin:20,borderRadius:16,alignSelf:'center'}}/>
            </Auto>
                <div style={{alignItems:'center',...styles,}}>
                    <MyText title>Bizniszelj!</MyText>
                    <Auto style={{flex:undefined,marginTop:10}}>
                        <div style={{margin:4,padding:12,backgroundColor:'#fcf9ef',flex:small?undefined:1}}>
                            <MyText size={17} bold>1. Mihez értesz?</MyText>
                            <MyText size={17}>Oszd meg másokkal, hogy miben vagy tehetséges! Akár kézműves termékeket készítesz, korrepetálsz vagy tanácsot adsz, itt hirdetheted magad.</MyText>
                        </div>
                        <div style={{margin:4,padding:12,backgroundColor:'#fcf9ef',flex:small?undefined:1}}>
                            <MyText size={17} bold>2. Lépj kapcsolatba!</MyText>
                            <MyText size={17}>Keress a szakemberek, művészek, alkotók közt! Fedezd fel a többiek bizniszeit!</MyText>
                        </div>
                        <div style={{margin:4,padding:12,backgroundColor:'#fcf9ef',flex:small?undefined:1}}>
                            <MyText size={17} bold>3. Köss biznisz kapcsolatot!</MyText>
                            <MyText size={17}>Keressétek meg egymásban a kereslet és kínálatot</MyText>
                        </div>
                        <div style={{margin:4,padding:12,backgroundColor:'#fcf9ef',flex:small?undefined:1}}>
                            <MyText size={17} bold>4. Ajánlj be másokat!</MyText>
                            <MyText size={17}>Jelezz vissza, kik azok akik valódi segitséget tudnak nyújtani.</MyText>
                        </div>
                    </Auto>
                    <NewButton title="Irány Bizniszelni!"/>
                </div>
            <Auto style={{flex:undefined}}>
                <Image src={require('@/assets/logo.png')} alt="" style={{height:200,width:200,margin:20,borderRadius:16,alignSelf:'center'}}/>

                <MyText contained style={{...(small&&{order:3})}}>
                <MyText title>Pajtások</MyText>{'\n'}Az oldal biztonságát az úgynevezett pajtásrendszerrel biztosítjuk. 
                Pajtásodnak akkor jelölhetsz valakit, ha megbízol az illetőben.
                Bizonyos funkciókat pedig csak akkor használhatsz, 
                ha megfelelő mennyiségű ember már megbízhatónak jelölt téged.</MyText>
            </Auto>

            <div style={{}}>
                <MyText contained style={{textAlign:'center'}}>
                <MyText title>Csatlakozz a FiFék közösségéhez!</MyText>{'\n'}
                    <MyText>Fifék így nyilatkoztak...</MyText>
                    <Comments style={{marginLeft:small?0:50}} path="aboutComments" limit={9} justComments commentStyle={{backgroundColor:'#fcf9ef',padding:10,textAlign:'left',fontSize:13,borderRadius:8}}/>
                </MyText>    
            </div>
            <Auto style={{flex:'none'}}>
                <MyText contained>
                <MyText title>Rólam</MyText>{'\n'}
                Kristóf Ákos vagyok, én találtam ki és fejlesztem egyedül a fife appot. Ez egy olyan projekt, 
                amibe szívemet-lelkemet bele tudom rakni, értetek, és egy jobb világért dolgozom rajta. 
                Az oldal fenntartásához, fejlesztéséhez sok idő és pénz is kell, éppen ezért kérem a támogatásotokat. 
                Ha neked is fontos a projekt célja, és szívesen használnád az appot, kérlek 
                egy pár száz forinttal segítsd az elindulásunkat:){'\n'}
                <NewButton onPress={()=>{ Linking.openURL('https://patreon.com/fifeapp') }} color="#fdcf99"
            title="Itt tudsz adományozni!" style={{alignSelf:small?'center':'flex-end'}}/> 

                </MyText>
                <Image src={require('@/assets/en.jpeg')} resizeMode="cover" style={{height:200,width:200,margin:20,borderRadius:16,alignSelf:'center'}}/>


            </Auto>
            <MyText style={{fontSize:28,textAlign:'center',marginTop:30}}>Csatlakozz a fifékhez!</MyText>
            <Row style={{alignItems:'center',justifyContent:'center',padding:12}}>
                <NewButton title="Bejelentkezés" onPress={()=>router.push('/bejelentkezes')}/>
                <NewButton title="Regisztrálj!" color="#FDEEA2" onPress={()=>router.push('/regisztracio')}/>
            </Row>
        </div>
    </BasePage>)
}

export default About