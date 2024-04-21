import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image'
import Link from 'next/link'
import styles from '../page.module.css'
import Ideas from '@/components/Ideas/Ideas';

const Page = () => {
    return (
        <Box>
            <Container size="3" mt="8">
                <Heading size='8'>Vegyél részt benne!</Heading>
                <Text>
                    Ezt az appot azért készítjük hogy egy olyan magyar közösséget hozzunk létre az online térben, amely a bizalomról, összetartásról, és valóban az emberekről szól.
                    Ez a kezdeményezés nonprofit és nyílt forráskódú, azaz bárki hozzájárulhat a létrejöttéhez, te is!:)
                    
                    <Heading size='5'>Hogyan tudsz részt venni a projektben?</Heading>

                    <Box m='5' className={styles.container} >
                        <Heading size='3'>Ötletláda</Heading>
                        <Text>
                            Ez az app hatalmasnak ígérkezik de szeretnénk ha azt valósítanánk meg először, amit ti szeretetnétek. 
                            Keresgélj a meglévő ötletek között és értékeld őket! Ha saját ötleted van, azt is hozzáadhatod!
                        </Text>
                        <Ideas />
                    </Box>

                    <Box m='5' className={styles.container} >
                        <Heading>Csatlakozz a csapatba!</Heading>
                        <Text>Ha többet szeretnél tenni, itt vannak azok a feladatkörök amelyekben szükségünk van a segítségedre.</Text>
                        <Flex direction='row' flexGrow='1'>
                            <Box width={'200px'} m='1'>
                                <Image src={require('../../assets/profile.jpeg')} alt="Kristóf Ákos" style={{width:'100%',height:100,objectFit:'cover'}} />
                                <Heading size='4'>Harsányi Fanni</Heading>
                                <Text></Text>
                            </Box>
                            <Box width={'200px'} m='1'>
                                <Image src={require('../../assets/profile.jpeg')} alt="Kristóf Ákos" style={{width:'100%',height:100,objectFit:'cover'}} />
                                <Heading size='4'>Erdész Ábel</Heading>
                                <Text></Text>
                            </Box>
                            <Box width={'200px'} m='1'>
                                <Image src={require('../../assets/en.jpeg')} alt="Kristóf Ákos" style={{width:'100%',height:100,objectFit:'cover',objectPosition:'0 0'}} />
                                <Heading size='4'>Kristóf Ákos</Heading>
                                <Text>Én találtam ki a FiFe Appot, vezetőként és fejlesztőként dolgozom most benne.</Text>
                            </Box>
                            <Box width={'200px'} m='1'>
                                <Image src={require('../../assets/en.jpeg')} alt="Kristóf Ákos" style={{width:'100%',height:100,objectFit:'cover',objectPosition:'0 0'}} />
                                <Heading size='4'>Kristóf Ákos</Heading>
                                <Text>Én találtam ki a FiFe Appot, vezetőként és fejlesztőként dolgozom most benne.</Text>
                            </Box>
                        </Flex>

                        <Box></Box>
                    </Box>
                </Text>
            </Container>
        </Box>
    )
}

export default Page
