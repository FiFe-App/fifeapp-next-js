import { FC, ReactNode, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { Text } from '../Text'
import router from 'next/router'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface Props {
    children?: ReactNode,
    style?: Record<string, unknown>,
    authorname?: String,
    authorUid?: String,
    src: string | StaticImport
}

const AuthoredImage: FC<Props> = (props:Props) => {
    const ref = useRef(null)
    const navigation = router
    const { authorUid, authorname } = props
    const uid = useSelector((state:any) => state.user.uid)
    const [hovered, setHovered] = useState(false)

    const handlePress = () => {
        if (authorUid && uid)
            navigation.push( 'profil', { query:{uid: authorUid} })
    }
    return (
        <div
        style={{position:'relative'}}
        onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
            ref={ref}
        >
            <Image {...props}  alt="" >
                
            </Image>
            {hovered && (
                <div
                    onClick={handlePress}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: '#000000aa',
                    }}
                >
                    <Text style={{ color: 'white' }}>
                        készítette: {authorname}
                    </Text>
                </div>
            )}
        </div>
    )
}

export default AuthoredImage
