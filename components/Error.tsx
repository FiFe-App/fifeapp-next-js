import { Button, Flex, Text } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";


const Error = ({text}:{text:string|Object}) => {
    const route = usePathname();
    const router = useRouter()
    const t = (typeof text === 'string' || typeof text == "string") ? text : JSON.stringify(text)
    return (<Flex style={{flex:1,height:'100%',alignItems:'center',justifyContent:'center'}}>
        <Flex style={{backgroundColor:'transparent',padding:32,borderRadius:8,alignItems:'center',justifyContent:'center'}}>
                <Text>Aj-aj hiba történt!</Text>
                {text&&<Text>{getErrorText(t)}</Text>}
                <Button onClick={()=>{
                    router.push(route)
                }} >Oldal újratöltése</Button>
        </Flex>
    </Flex>)

}

const getErrorText = (code:string) => {
    switch(code) {
        case 'Token expired':
            return 'Lejárt a munkamenet'
        default:
          return code;
      }
}

export default Error;