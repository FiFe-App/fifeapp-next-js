  import { useEffect, useState } from 'react'
  import { Text } from 'react-native'
  import { useSelector } from 'react-redux';
  import { MyText } from '../../components/Components';
    
  export const TextFor = ({pureText,text,style,embed,fixed,children}) => {
      
      const texts = require('./texts.json');
      const arr = texts?.[text]
      const on = useSelector((state) => state.user?.settings.fancyText)
      const [r, setR] = useState(0);
      const [displayText, setDisplayText] = useState(text);
      useEffect(() => {
          if (!arr) return

          setR(Math.floor(Math.random() * (arr?.length)))
      }, [on]);
      useEffect(() => {
        if (!arr) return
        
        if (on || !fixed)
          if (embed)
            setDisplayText(arr[r].replace('$', embed))
          else
            setDisplayText(arr[r].replace('$', 'fife'))
        else 
          if (embed)
            setDisplayText(arr[r].replace('$', embed))
          else
            setDisplayText(arr[0])
      }, [r]);
      if (pureText) return displayText.toString()
      return <MyText style={style}>{displayText}{children}</MyText>
  }

  export const shorten = (str) => {  
    let n = 100;
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
  }

  export const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    console.log(hour);
    if (hour < 12 && hour > 6)
      return 'greeting_morning'
    else if (hour >= 20 && hour < 23)
      return 'greeting_evening'
    else return 'greeting_normal'

  }
  
  export const AutoPrefix = ({text}) => {
      return embedWord(text)
  }

  function urlify(text) {
    var urlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|hu|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    return text.replace(urlRegex, function(url) {
      return <Link href="//' + url + '">{text}</Link>;
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }
  
  String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  }
  
  String.prototype.lastVowel = function() {
    let last = '';
    for (let i = 0; i < this.length; i++) {
      if (isVowel(this[i])) {
        last = this[i];
      }
    }
    return last;
  }
  
  function isVowel(char){
    char = char.toLowerCase();
    if ('aáeéiíoóöőuúüú'.indexOf(char) >= 0) return true;
    return false;
  }
  
  function isCharHigh(char){
    char = char.toLowerCase();
    if ('eéiíöőüű'.indexOf(char) >= 0) return true;
    return false;
  }
  
  function ToHigh(vowel){
    vowel.toLowerCase();
    const low = 'aóo';
    const high =  'eőe';
    let i = low.indexOf(vowel);
    if (i >= 0)
      return high.slice(i,i+1)
    else return vowel;
  }
  
  function toLong(vowel){
    vowel = vowel.toLowerCase();
    const short = 'aeoöuü';
    const long =  'áéóőúű';
    let i = short.indexOf(vowel);
    if (i >= 0)
      return long.slice(i,i+1)
    else return vowel;
  }
  
  function wordToHigh(word){
    for (let i = 0; i < word.length; i++) {
      if (isVowel(word[i])) {
        word = word.replaceAt(i,ToHigh(word[i]));
      }
    }
    return word;
  }
  
  function getPitch(word){
    let high = 0;
    let low = 0;
    for (let i = 0; i < word.length; i++) {
      if (isVowel(word[i])) {
        if (isCharHigh(word[i])) high++;
        else low++;
      }
    }
    if (low == 0 && high > 0) return 'high';
    if (high == 0 && low > 0) return 'low';
    if (low > 0 && high > 0) return 'mixed';
    return 'none';
  }
  
  export const toldalek = (str,toldalek) => {
    if (!(str && toldalek)) return null;
    if (str == '' || toldalek == '' || str?.length < 3) return '...';
    str = str.trim();
  
    let pitch = getPitch(str);
    if (pitch != 'low' && !(pitch == 'mixed' && !isCharHigh(str.lastVowel()))) {
      toldalek = wordToHigh(toldalek);
    }
  
    const toldE = toldalek.slice(0,1)
    const szotU = toldalek.slice(-1)
    // ha a toldalék magánhangzóval kezdődik
    if(isVowel(toldE)) {
      //        szótő utolsó betűje     tő a vége nélkül  szótő utolsó betűje   toldalek első b nélkül
      if (isVowel(szotU) && szotU == toldE) {
        //if (str.slice(-1) == toldalek.slice(0,1)) return 
        return str.slice(0,-1)+toLong(str.slice(-1))+toldalek.slice(1);
      }
      return str+toldalek;
  
    } else {
      if (isVowel(str.slice(-1))) return str.slice(0,-1)+toLong(str.slice(-1))+toldalek;
      else if (str.slice(-1) == str.slice(-2,-1) && str.slice(-2,-1) == toldalek.slice(0,1)) return str+toldalek.slice(1);
      return str+str.slice(-1)+toldalek.slice(1);
    }
  }
  
  export function embedWord(str) {
    console.log((str instanceof String));
    if (typeof str !== 'string' || str?.length == 0 ) return '...';
    if (isVowel(str.substring(0,1))) {
      return 'az '+str;
    }
    return 'a '+str;
  }

export function elapsedTime(date) {
    
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

function getSynonims(key){
  const request = new Request('https://cors-anywhere.herokuapp.com/https://api.poet.hu/szinonima.php?f=akoskristof&j=e7a5cefcde99071ab9001c91f3d892e0&s='+key);
  return fetch(request).then(async (response) => {
    if (response.status === 200) {

      let converted = await response.text()
      converted = converted.toString().split('<szinonima>')
      converted = converted.map(e=>{
        return e.slice(0,e.indexOf('<'))
      })
      converted.shift()
      return converted
    } else {
      throw new Error('Something went wrong on API server!');
    }
  })
}

async function getSynonims2(key,callback) {

  console.log('getSynonims');
  const Http = new XMLHttpRequest();
  const url='https://cors-anywhere.herokuapp.com/https://api.poet.hu/szinonima.php?f=akoskristof&j=e7a5cefcde99071ab9001c91f3d892e0&s='+key;
  Http.open('GET', url);
  Http.send();

  Http.onreadystatechange = (e) => {
    let converted = Http.responseText.toString().split('<szinonima>')
    converted = converted.map(e=>{
     return e.slice(0,e.indexOf('<'))
    })
    callback(converted.shift())
  }
}

export async function search(key,array,withSynonims) {
  let found = null;
  key = key.toLowerCase()

  let synonims = []
  if (withSynonims)
  synonims = await getSynonims(key)
  
  synonims.push(key)

  array.forEach(element => {
    synonims.forEach(synonim => {
      if (element.toLowerCase().includes(synonim)) {
        found = true
        return
      }
    })
  });
  return ({found,keys:synonims})
}