import { Flex, Spinner, Text } from '@radix-ui/themes'
import { get, getDatabase, ref } from 'firebase/database'
import { getDownloadURL, getStorage, ref as sRef } from 'firebase/storage'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function deepEqual(x, y) {
    const ok = Object.keys,
        tx = typeof x,
        ty = typeof y
    return x && y && tx === 'object' && tx === ty
        ? ok(x).length === ok(y).length &&
              ok(x).every((key) => deepEqual(x[key], y[key]))
        : x === y
}
export function arraysEqual(a, b) {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
    }
    return true
}

export function randomColor() {
    const list = ['#d4ffef', '#f9d4ff', '#fffed4']
    return list[Math.floor(Math.random() * list.length)]
}

export function shadeColor(color, percent) {
    var R = parseInt(color.substring(1, 3), 16)
    var G = parseInt(color.substring(3, 5), 16)
    var B = parseInt(color.substring(5, 7), 16)

    R = parseInt((R * (100 + percent)) / 100)
    G = parseInt((G * (100 + percent)) / 100)
    B = parseInt((B * (100 + percent)) / 100)

    R = R < 255 ? R : 255
    G = G < 255 ? G : 255
    B = B < 255 ? B : 255

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
    var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
    var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)

    return '#' + RR + GG + BB
}

export function listToMatrix(list, elementsPerSubArray) {
    var matrix = [],
        i,
        k
    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++
            matrix[k] = []
        }

        matrix[k]?.push(list[i])
    }

    return matrix
}

export const isBright = function (color) {
    // #FF00FF
    var textCol = 'black'
    var c = color.substring(1) // strip #
    var rgb = parseInt(c, 16) // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff // extract red
    var g = (rgb >> 8) & 0xff // extract green
    var b = (rgb >> 0) & 0xff // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

    if (luma < 150) {
        textCol = 'white'
    }

    return textCol
}

export function useSmallerThan(breakPoint=900) {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const md = window.matchMedia("(min-width: "+breakPoint+"px)").matches;

    return md
}

export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window?.innerWidth,
                height: window?.innerHeight,
            })
        }

        // Add event listener
        window.addEventListener('resize', handleResize)

        // Call handler right away so state gets updated with initial window size
        handleResize()

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, []) // Empty array ensures that effect is only run on mount
    return windowSize
}


    export const getUri = async (path) => {
        const storage = getStorage();
        const imgRef = sRef(storage, path);
        const url = await getDownloadURL(imgRef)
        console.log(path,url);
        return url
  } 
  
  export const getNameOf = async (uid) => {
    const name = localStorage.getItem('name-'+uid)
  
    if (name != null && name != 'NINCS NÉV') {
      return name;}
    else {
      const res = (await get(ref(getDatabase(),`users/${uid}/data/name`))).val()
    
      if (res) {
        const name = res;
        localStorage.setItem('name-'+uid,name)
        return name;
      }
      localStorage.setItem('name-'+uid,'NINCS NÉV')
      return 'NINCS NÉV'
  
    }
  }
  
  
  export const ProfileImage = ({uid,size='100%',style,path,modal}) => {
    // eslint-disable-next-line no-undef
    const defaultUrl = require('../assets/profile.jpeg');
    const [url, setUrl] = useState(null);
    const storage = getStorage();
  
    useEffect(() => {
      if (uid || path){
  
        getDownloadURL(sRef(storage, path || `profiles/${uid}/profile.jpg`))
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          console.log('e',error);
          setUrl(defaultUrl)
        });
  
      }
    }, [uid,path]);
  
    const loading = <Flex style={{alignItems:'center',justifyContent:'center'}}>
      <Spinner style={{width: size, height: size}} color='rgba(255,175,0,1)' />
    </Flex>
  
    if (!url) return loading
    if (modal) return "image modal not implemented"
    //<ImageModal style={[{width: size, height: size},style]}  cachePolicy='memory-disk'     source={url}  />
  
    return <Flex style={style}>
      <Image style={[{width: size, height: size,borderRadius:8}]}
            cachePolicy='memory-disk'
            onError={()=>{
              setUrl(defaultUrl)
              }
            }
            alt=''
            source={url}/>
    </Flex>
      
      
  }
  export const ProfileName = ({uid,style}) => {
    // eslint-disable-next-line no-undef
    const [name, setName] = useState(null);
  
    useEffect(() => {
      (async ()=>{
        setName(await getNameOf(uid));
      })()
    }, [uid]);
  
    if (!name) return null
    return <Text style={style}>{name}</Text>   
  }
  