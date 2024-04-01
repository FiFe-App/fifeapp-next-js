import { buziness } from "@prisma/client";
import { Box, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect } from "react";

async function getData() {
    const res = await fetch('http://localhost:3000/api',{method:'GET'})
    
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const d = res.json();
    
    return d
  }

export default async function Page() {
    const data:Array<buziness> = (await getData()).results
    
    return (<Box>
            {!!data.length && data?.map((e,i)=>{
                return <Text key={i} as='p'>
                    {e.name}
                </Text>
            })}
    </Box>)
}