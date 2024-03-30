'use client'

import { Auto } from '@/components/Auto'
import BasePage from '@/components/BasePage'
import { Row } from '@/components/Row'
import { Smiley } from '@/components/Smiley'
import Image from 'next/image'
import router from 'next/router'
import { useState } from 'react'
import styles from '@/styles/aboutDesign'
import ErrorBoundary from '@/components/ErrorHandling'
import AuthoredImage from '@/components/AuthoredImage'
import Comments from '@/components/firebase/Comments'
import { Box, Button, Heading, Text } from '@radix-ui/themes'

const About = () => {
    const small = false //useWindowDimensions().width <= 900;
    //const db = getDatabase()
    const navigation = router
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)

    //let [fontsLoaded] = useFonts({       AmaticSC_700Bold, Raleway_800ExtraBold});
    const handleSend = async () => {
        if (email) {
            const newPostRef = push(ref(db, 'about/emails'))
            set(newPostRef, {
                email,
            })
                .then((res) => {
                    console.log(res)
                    setEmail('')
                    setSent(true)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const next = () => {
        console.log('next')
        navigation.push('/')
        //localStorage.setItem('login',true)
    }
    return (
        <Box >
            <Box
                style={{
                    marginLeft: small ? 0 : 100,
                    marginRight: small ? 0 : 100,
                }}
            >
                <Box className="container">
                    <Row style={{ alignItems: 'center', textAlign: 'center' }}>
                        <Smiley style={{ margin: 32 }} />
                        <Box style={{ flex: 1 }}>
                            <Heading>FiFe App</Heading>
                            <Heading size="3" style={{ marginTop: -4 }}>
                                A biztonságos online tér
                            </Heading>
                        </Box>
                    </Row>
                    <Text style={{ textAlign: 'left', fontSize: 17 }}>
                        {'\n'}A mai elszigetelt világban szükség van egy olyan
                        rendszerre, amely összehozza a jóérzésű embereket egy
                        biztonságos közösségbe.
                        {'\n'}Ez a gondolat ihlette a{' '}
                        <b>Fiatal Felnőttek applikációt</b>, amely sokrétű
                        online felületet nyújt a nagyvárosban élőknek.
                    </Text>
                </Box>
                <Auto
                    style={{
                        flex: undefined,
                        alignItems: 'center',
                        justifyItems: 'center',
                    }}
                >
                    <Text
                        contained
                        style={{
                            flexGrow: 1,
                            marginBottom: 20,
                            order: small ? 3 : 0,
                        }}
                    >
                        <Heading>Cserebere</Heading>
                        {'\n'}
                        Egy egyszerű adok-veszek oldal, ahol keresgélhetsz
                        illetve hirdethetsz eladó tárgyak, munkák, kiadó lakások
                        közt. Ezeket a cikkeket le tudod foglalni, és chatelni a
                        hirdetővel.
                        {'\n'}
                        <Box style={{ width: '100%', alignItems: 'center' }}>
                            <Button>Megyek csereberélni!</Button>
                        </Box>
                    </Text>
                    <AuthoredImage
                        authorName="Vitányi Regina"
                        src={require('@/assets/img-prof.jpg')}
                        resizeMode="contain"
                        style={{
                            height: 200,
                            width: 200,
                            margin: 20,
                            borderRadius: 16,
                            alignSelf: 'center',
                        }}
                    />
                </Auto>
                <Box style={{ alignItems: 'center', ...styles }}>
                    <Heading>Bizniszelj!</Heading>
                    <Auto style={{ flex: undefined, marginTop: 10 }}>
                        <Box
                            style={{
                                margin: 4,
                                padding: 12,
                                backgroundColor: '#fcf9ef',
                                flex: small ? undefined : 1,
                            }}
                        >
                            <Text size={17} bold>
                                1. Mihez értesz?
                            </Text>
                            <Text size={17}>
                                Oszd meg másokkal, hogy miben vagy tehetséges!
                                Akár kézműves termékeket készítesz, korrepetálsz
                                vagy tanácsot adsz, itt hirdetheted magad.
                            </Text>
                        </Box>
                        <Box
                            style={{
                                margin: 4,
                                padding: 12,
                                backgroundColor: '#fcf9ef',
                                flex: small ? undefined : 1,
                            }}
                        >
                            <Text size={17} bold>
                                2. Lépj kapcsolatba!
                            </Text>
                            <Text size={17}>
                                Keress a szakemberek, művészek, alkotók közt!
                                Fedezd fel a többiek bizniszeit!
                            </Text>
                        </Box>
                        <Box
                            style={{
                                margin: 4,
                                padding: 12,
                                backgroundColor: '#fcf9ef',
                                flex: small ? undefined : 1,
                            }}
                        >
                            <Text size={17} bold>
                                3. Köss biznisz kapcsolatot!
                            </Text>
                            <Text size={17}>
                                Keressétek meg egymásban a kereslet és kínálatot
                            </Text>
                        </Box>
                        <Box
                            style={{
                                margin: 4,
                                padding: 12,
                                backgroundColor: '#fcf9ef',
                                flex: small ? undefined : 1,
                            }}
                        >
                            <Text size={17} bold>
                                4. Ajánlj be másokat!
                            </Text>
                            <Text size={17}>
                                Jelezz vissza, kik azok akik valódi segitséget
                                tudnak nyújtani.
                            </Text>
                        </Box>
                    </Auto>
                    <Button>Irány Bizniszelni!</Button>
                </Box>
                <Auto style={{ flex: undefined }}>
                    <Image
                        src={require('@/assets/logo.png')}
                        alt=""
                        style={{
                            height: 200,
                            width: 200,
                            margin: 20,
                            borderRadius: 16,
                            alignSelf: 'center',
                        }}
                    />

                    <Text contained style={{ ...(small && { order: 3 }) }}>
                        <Heading>Pajtások</Heading>
                        {'\n'}Az oldal biztonságát az úgynevezett
                        pajtásrendszerrel biztosítjuk. Pajtásodnak akkor
                        jelölhetsz valakit, ha megbízol az illetőben. Bizonyos
                        funkciókat pedig csak akkor használhatsz, ha megfelelő
                        mennyiségű ember már megbízhatónak jelölt téged.
                    </Text>
                </Auto>

                <Box style={{}}>
                    <Text contained style={{ textAlign: 'center' }}>
                        <Heading>Csatlakozz a FiFék közösségéhez!</Heading>
                        {'\n'}
                        <Text>Fifék így nyilatkoztak...</Text>
                        <Comments
                            style={{ marginLeft: small ? 0 : 50 }}
                            path="aboutComments"
                            limit={9}
                            justComments
                            commentStyle={{
                                backgroundColor: '#fcf9ef',
                                padding: 10,
                                textAlign: 'left',
                                fontSize: 13,
                                borderRadius: 8,
                            }}
                        />
                    </Text>
                </Box>
                <Auto style={{ flex: 'none' }}>
                    <Text contained>
                        <Heading>Rólam</Heading>
                        {'\n'}
                        Kristóf Ákos vagyok, én találtam ki és fejlesztem
                        egyedül a fife appot. Ez egy olyan projekt, amibe
                        szívemet-lelkemet bele tudom rakni, értetek, és egy jobb
                        világért dolgozom rajta. Az oldal fenntartásához,
                        fejlesztéséhez sok idő és pénz is kell, éppen ezért
                        kérem a támogatásotokat. Ha neked is fontos a projekt
                        célja, és szívesen használnád az appot, kérlek egy pár
                        száz forinttal segítsd az elindulásunkat:){'\n'}
                        <Button
                            onClick={() => {
                                Linking.openURL('https://patreon.com/fifeapp')
                            }}
                            style={{ alignSelf: small ? 'center' : 'flex-end' }}
                        >Itt tudsz adományozni!</Button>
                    </Text>
                    <Image
                        src={require('@/assets/en.jpeg')}
                        resizeMode="cover"
                        style={{
                            height: 200,
                            width: 200,
                            margin: 20,
                            borderRadius: 16,
                            alignSelf: 'center',
                        }}
                    />
                </Auto>
                <Text
                    style={{ fontSize: 28, textAlign: 'center', marginTop: 30 }}
                >
                    Csatlakozz a fifékhez!
                </Text>
                <Row
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 12,
                    }}
                >
                    <Button
                    
                        onClick={() => router.push('/bejelentkezes')}
                    >Bejelentkezés</Button>
                    <Button
                        onClick={() => router.push('/regisztracio')}
                    >Regisztrálj!</Button>
                </Row>
            </Box>
        </Box>
    )
}

export default About
