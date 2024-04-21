'use client'

import styles from './page.module.css'
import { Auto } from '@/components/Auto'
import { Row } from '@/components/Row'
import Image from 'next/image'
import { useState } from 'react'
import AuthoredImage from '@/components/AuthoredImage/AuthoredImage'
import Comments from '@/components/firebase/Comments'
import { Box, Button, Container, Heading, Text } from '@radix-ui/themes'
import { getDatabase, push, ref, set } from 'firebase/database'
import { useWindowSize } from '@/lib/functions'
import { Header } from '@/components'
import { useRouter } from 'next/navigation'

const About = () => {
    const width = useWindowSize().width;
    const small = width<900;
    
    const db = getDatabase()
    const router = useRouter()
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
        router.push('/')
        //localStorage.setItem('login',true)
    }
    if (width!=undefined)
    return (
        <Box>
            <Container size="3">
                <Header></Header>
                <Box className="container">
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
                        className={[styles.container, styles.last_on_small].join(' ')}
                        style={{
                            flexGrow: 1,
                            marginBottom: 20
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
                        authorname="Vitányi Regina"
                        src={require('@/assets/img-prof.jpg')}
                        style={{
                            height: 200,
                            width: 200,
                            margin: 20,
                            borderRadius: 16,
                            alignSelf: 'center',
                        }}
                    />
                </Auto>
                <Box
                    className={styles.container}
                    style={{ alignItems: 'center' }}
                >
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
                            <Heading size="2">1. Mihez értesz?</Heading>
                            <Text size="2">
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
                            <Heading size="2">2. Lépj kapcsolatba!</Heading>
                            <Text size="2">
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
                            <Heading size="2">
                                3. Köss biznisz kapcsolatot!
                            </Heading>
                            <Text size="2">
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
                            <Heading size="2">4. Ajánlj be másokat!</Heading>
                            <Text size="2">
                                Jelezz vissza, kik azok akik valódi segitséget
                                tudnak nyújtani.
                            </Text>
                        </Box>
                    </Auto>
                    <Button variant="soft">Irány Bizniszelni!</Button>
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
                    <Text style={small ? { order: 3 } : {}}>
                        <Heading>Pajtások</Heading>
                        {'\n'}Az oldal biztonságát az úgynevezett
                        pajtásrendszerrel biztosítjuk. Pajtásodnak akkor
                        jelölhetsz valakit, ha megbízol az illetőben. Bizonyos
                        funkciókat pedig csak akkor használhatsz, ha megfelelő
                        mennyiségű ember már megbízhatónak jelölt téged.
                    </Text>
                </Auto>
                <Box style={{}}>
                    <Text style={{ textAlign: 'center' }}>
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
                    <Text>
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
                            variant="soft"
                            onClick={() => {
                                location.replace('https://patreon.com/fifeapp')
                            }}
                            style={{ alignSelf: small ? 'center' : 'flex-end' }}
                        >
                            Itt tudsz adományozni!
                        </Button>
                    </Text>
                    <Image
                        alt="Én"
                        src={require('@/assets/en.jpeg')}
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
                        variant="soft"
                        onClick={() => router.push('/bejelentkezes')}
                    >
                        Bejelentkezés
                    </Button>
                    <Button onClick={() => router.push('/regisztracio')}>
                        Regisztrálj!
                    </Button>
                </Row>
            </Container>
        </Box>
    )
}

export default About
