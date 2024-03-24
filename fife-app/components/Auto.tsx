import { useWindowSize } from "@/lib/functions"

export function Auto({children,style,flex,breakPoint=900,reverse,onLayout}) {
  
    const {width} = useWindowSize();
    console.log();
    
    return (
      <div
      onLayout={onLayout}
      style={{
        flexDirection: reverse ? 
        width > breakPoint ? 'column' : 'row':
        width <= breakPoint ? 'column' : 'row'
        ,width:'100%',flex: flex!=undefined ? (flex==0?undefined:flex) : (width <= breakPoint ? undefined : 1),...style}}>
        {children}
      </div>
    )
  }