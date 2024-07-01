import { categories } from "@/lib/categories";
import { getUri, useWindowSize } from "@/lib/functions";
import { TextFor } from "@/lib/textService/textService";
import homeDesign from "@/styles/homeDesign";
import { Box, Flex, ScrollArea, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { AddOutline } from "react-ionicons";

interface Props {
    title: string,
    link: string,
    list: any,
    params: Object,
    data: Array<any>,
    id: string,
    newLink: string,
}
interface ModuleElement {
    _id?:string,
    id:number,
    title: string,
    link:string,
    category: number | string,
    color: string
}

export const Module: FC<{data:Props|null}> = (props) => {
    const { title, link, list, params, data, id, newLink } = props?.data || {};
    const { width } = useWindowSize();
    const navigation = useRouter();
    const onClick = (to:string) => {
      navigation.push(to,params);
    }

    const [images, setImages] = useState<Array<any>>([]);

    useEffect(() => {
    }, [images]);

    useEffect(() => {
      let resList
      if (data?.length)
      {
        (async ()=>{
        resList = await Promise.all(data.map( async (el,i)=> {
          let image
          console.log('module',title);
          try {
           image = el?.image || await getUri(id+'/'+el._id+'/'+0)
          } catch (error) {
            console.log(title,error);
            if (el?.author)
              try{image = await getUri(`profiles/${el.author}/profile.jpg`)} catch {
                image = 'def'
            }
          }
          
          console.log('module',i,title,image);
          return image
        }))
        setImages(resList)
      })()
}
    }, [data]);

    if (!data?.length && title) return null
    return (
        <Flex style={{...homeDesign.moduleContainer, flex:1}}>
            <Flex direction='row' style={{paddingLeft:20,paddingBottom:10}}>
            { data?.length && link ?
              <Box onClick={()=>onClick(link)}>
                 <Text style={{ fontWeight: 'bold', fontSize:width>900?20:17 }}>{title}</Text>
                 {false && <TextFor style={{ fontWeight: 'bold', fontSize:width>900?30:20 }} fixed text={title}/>}
              </Box>:
              <LoadingModule ind={1} flat />}
            </Flex>
          {<Flex direction='row' style={homeDesign.moduleScrollView}>
            {data?.length ? data?.map((one:ModuleElement,ind:number)=>{
            
              if (one && id){
                const category = typeof one.category == "string" ? {name:one.category} :  categories?.[id]?.[(id=='places'?one.category-1:one.category)]
                return (
                  <Box key={ind+'one'} style={homeDesign.module} onClick={()=>{
                    
                    navigation.push(`/${link}?id=${one._id}`)
                  }}>
                      <>
                      <Image
                        alt=''
                      src={images?.[ind]!='def'?{uri:images?.[ind]}:require('../assets/profile.jpeg')}  style={{height:100, width:'100%',borderTopLeftRadius:8,borderTopRightRadius:8,justifyContent: 'flex-end',objectFit:'cover'}} />
                        <Flex style={{position:'absolute',alignSelf: 'flex-end'}}>
                          <Text style={{margin:5,backgroundColor:(one?.color||'rgba(204, 255, 204,200)'),padding:5,borderRadius:8,fontSize:12}}>{category?.name}</Text>
                        </Flex>
                      <Flex style={{}}>
                        <Text 
                        style={{...homeDesign.moduleText,fontWeight:'bold'}}>{one.title}</Text>
                      </Flex>
                      </>
                  </Box>
                )
              }
            }) : 
              (
              [1,1,1]?.map((one,ind)=>{
              return <LoadingModule ind={ind} key={ind+'blank'} />
            }))
            } 

          </Flex>
            }
        </Flex>
    );
    
  }

  const LoadingModule = ({ind,flat}:{ind?:number,flat?:boolean}) => {

      const sweepAnim = 0//useRef(new Animated.Value(0.5)).current  // Initial value for opacity: 0

        //outputRange:["rgb(250, 250, 250)" , "rgb(250, 237, 204)"]
      return (
          <Flex key={ind+'one'} style={{...homeDesign.module,backgroundColor:'rgb(250, 250, 250)',opacity:1,borderRadius:8,height:120,
          ...(flat&&{height:20,flex:undefined,width:300})}}>
          </Flex>
      )
  }

export default Module