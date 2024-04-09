'use client'

import styles from './footer.module.css';
import { useDispatch } from 'react-redux';
import { setBugData } from '../lib/userReducer';
import { useState } from 'react';
import { Auto } from './Auto';
import { Button, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';
import { useWindowSize } from '@/lib/functions';

const Footer = ({}) => {

    const dispatch = useDispatch()
    const {width} = useWindowSize();
    const small = width < 900
    return (
        <Auto
         style={{backgroundColor:'#FDEEA2',padding:40,bottom:0,alignItems:small?'center':'stretch'}}>
            <Flex className='flex-on-small' style={{width:'100%',maxWidth:300}}>
                <Image src={require('../assets/web_splash.png')} alt='logo'
                 style={{flex:1,minHeight:100,width:'100%',alignSelf:'center',objectFit:'cover',objectPosition:small?'top center':'left center'}}/>
            </Flex>
            <Flex className='flex-on-small' style={{alignItems:small?'flex-end':'flex-start',minHeight:100}}>
                <Link href=''>
                    <Text weight='bold'>Légy részese</Text>
                </Link>
                <Link href='mailto:kristofakos1229@gmail.com'><Text>Írj emailt!</Text></Link>
                <Button variant='ghost' onClick={()=>dispatch(setBugData(true))} ><Text>Hibát találtam!</Text></Button>
                <Link target='_blank' href='https://patreon.com/fifeapp'><Text>Itt tudsz adományozni</Text></Link>

            </Flex>
            <Flex className='flex-on-small' style={{alignItems:'flex-end',minHeight:100,width:'100%'}}>
                <Text weight='bold'>Hasznos linkek</Text>
                <Link href='/rolunk'><Text>Rólunk</Text></Link>
                <Link href='/felhasznalasi-feltetelek'><Text>Felhasználási feltételek</Text></Link>
                <Link href='/adatvedelem'><Text>Adatvédelem</Text></Link>
            </Flex>
        </Auto>
    )
};

export default Footer;