'use client'

import styles from './page.module.css'
import { Auto } from '@/components/Auto'
import { Row } from '@/components/Row'
import Image from 'next/image'
import router from 'next/router'
import { useState } from 'react'
import AuthoredImage from '@/components/AuthoredImage'
import Comments from '@/components/firebase/Comments'
import { Box, Button, Container, Flex, Heading, Text } from '@radix-ui/themes'
import { getDatabase, push, ref, set } from 'firebase/database'
import { useWindowSize } from '@/lib/functions'
import NetlifyBadge from '@/components/NetlifyBadge/NetlifyBadge'
import Link from 'next/link'

const About = () => {
    const small = useWindowSize().width <= 900
    const db = getDatabase()
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
        <Box>
            <Container size="3">
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
                        className={styles.container}
                        style={{
                            flexGrow: 1,
                            marginBottom: 20,
                            order: small ? 3 : 0,
                        }}
                    >
                        <Heading>Cserebere</Heading>
                        {'\n'}
                        Egy egyszerű adok-veszek oldal, ahol keresgélhetsz
                        illetve hirdethetsz a hozzád közeli tárgyak, munkák, kiadó lakások
                        közt. Tudsz chatelni is a
                        hirdetővel.
                        {'\n'}
                        <Box style={{ width: '100%', alignItems: 'center' }} mt='3'>
                            <Button highContrast>Megyek csereberélni!</Button>
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
                    <Text style={small ? { order: 3 } : {}}
                    className={styles.container} my='3'>
                        <Heading>Pajtások</Heading>
                        {'\n'}Az oldal biztonságát az úgynevezett
                        pajtásrendszerrel biztosítjuk. Pajtásodnak akkor
                        jelölhetsz valakit, ha megbízol az illetőben. Bizonyos
                        funkciókat pedig csak akkor használhatsz, ha megfelelő
                        mennyiségű ember már megbízhatónak jelölt téged.
                    </Text>
                </Auto>
                <Box mt='3'>
                    <Text style={{ textAlign: 'center' }}>
                        <Heading>Csatlakozz a FiFék közösségéhez!</Heading>
                        <Text>Fifék így nyilatkoztak:</Text>
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
                <Auto style={{ flex: 'none' }} className={styles.container}>
                    <Flex align='start'>
                        <Flex flexGrow='1'>
                            <Heading>Vegyél részt benne!</Heading>
                            Ez az app a közösségről szól, arról, hogy együtt többet tudunk tenni a jó cél érdekében.
                            A FiFe app egy nonprofit és open-source kezdeményezés amely egy összetartóbb társadalmat szeretne elérni,
                            ha ezekkel az elvekkel te is egyetértesz, csatlakozz hozzánk!
                        </Flex>
                            <Link href='/vegyel-reszt'><Button highContrast>Miben tudok segíteni?</Button></Link>
                    </Flex>
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
                <NetlifyBadge />
            </Container>
        </Box>
    )
}

export default About
