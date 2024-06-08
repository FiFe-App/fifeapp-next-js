import { buziness } from "@prisma/client";
import { Box, Text } from "@radix-ui/themes";


export default async function Page() {
    const data:Array<buziness> = []//(await getData()).results
    
    return (<Box>
            {!!data.length && data?.map((e,i)=>{
                return <Text key={i} as='p'>
                    {e.name}
                </Text>
            })}
    </Box>)
}