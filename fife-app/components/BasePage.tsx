"use client"

import { useWindowSize } from "@/lib/functions";
import { useEffect, useState } from "react";

const BasePage = ({children,style,full,title,noScroll=false,noFooter=false}:any) => {
    const { width, height } = useWindowSize()
    const [innerHeight, setInnerHeight] = useState(height);
    const [outerHeight, setOuterHeight] = useState(height);

    return(<>
        <div scrollEnabled={!noScroll} onLayout={(e)=>setOuterHeight(e.nativeEvent.layout.height)}
        contentContainerStyle={{display:'flex',flex:1,width:'100%',alignItems:full?'stretch':'center'}} 
        style={{zIndex:-1}}>
            <div style={{paddingHorizontal:width <= 900 ? 5 : 50,paddingTop:width <= 900 ? 5 : 50,maxWidth:full?'none':800,...style}} 
            onLayout={(e)=>setInnerHeight(e.nativeEvent.layout.height)}>
                {children}
            </div>
        </div></>
    )
}

export default BasePage;