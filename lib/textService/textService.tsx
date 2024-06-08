import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';


export function elapsedTime(date:string) {
    
    if (!date) return null;
    
    let str = 'másodperce'
    let elapsed = Date.now()-Date.parse(date)
    if (isNaN(elapsed)) return null;
    elapsed /= 1000
    if (elapsed >= 60) {
        elapsed /= 60
        str = 'perce'
        if (elapsed >= 60) {
            elapsed /= 60
            str = 'órája'
            if (elapsed >= 24) {
                elapsed /= 24
                str = 'napja'
                if (elapsed >= 7) {
                    elapsed /= 7
                    str = 'hete'
                    if (elapsed >= 4) {
                        elapsed /= 4
                        str = 'hónapja'
                        if (elapsed >= 12) {
                            elapsed /= 12
                            str = 'éve kb.'
                        }
                    }
                }
            }
        }
    }
  
    return Math.floor(elapsed) +' '+ str
  }

export const TextFor = ({ pureText, text, style, embed, fixed, children }:any) => {
    const texts = require('./texts.json')
    const arr = texts?.[text]
    const on = useSelector((state:any) => state.user?.settings.fancyText)
    const [r, setR] = useState(0)
    const [displayText, setDisplayText] = useState(text)
    useEffect(() => {
        if (!arr) return

        setR(Math.floor(Math.random() * arr?.length))
    }, [on])
    useEffect(() => {
        if (!arr) return

        if (on || !fixed)
            if (embed) setDisplayText(arr[r].replace('$', embed))
            else setDisplayText(arr[r].replace('$', 'fife'))
        else if (embed) setDisplayText(arr[r].replace('$', embed))
        else setDisplayText(arr[0])
    }, [r])
    if (pureText) return displayText.toString()
    return (<Text style={style} >
            {displayText}
            {children}
        </Text>
    )
}

export const shorten = (str:String) => {
    let n = 100
    return str.length > n ? str.slice(0, n - 1) + '...' : str
}

export const getGreeting = () => {
    const now = new Date()
    const hour = now.getHours()
    console.log(hour)
    if (hour < 12 && hour > 6) return 'greeting_morning'
    else if (hour >= 20 && hour < 23) return 'greeting_evening'
    else return 'greeting_normal'
}

export const AutoPrefix = ({ text }:{text:string}) => {
    return embedWord(text)
}

function isVowel(char:string){
    char = char.toLowerCase();
    if ('aáeéiíoóöőuúüú'.indexOf(char) >= 0) return true;
    return false;
  }

export function embedWord(str:string) {
    if (typeof str !== 'string' || str?.length == 0) return '...'
    if (isVowel(str.substring(0, 1))) {
        return 'az ' + str
    }
    return 'a ' + str
}

