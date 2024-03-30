import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { Text } from './Text'
import router from 'next/router'

const AuthoredImage = (props) => {
    const ref = useRef(null)
    const navigation = router
    const { authorUid, authorName } = props
    const uid = useSelector((state) => state.user.uid)
    const [hovered, setHovered] = useState(false)

    const handlePress = () => {
        if (authorUid && uid)
            navigation.push({ pathname: 'profil', params: { uid: authorUid } })
    }
    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Image {...props} />
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
                        készítette: {authorName}
                    </Text>
                </div>
            )}
        </div>
    )
}

export default AuthoredImage
