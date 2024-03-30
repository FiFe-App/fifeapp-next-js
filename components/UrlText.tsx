import { useEffect } from 'react'
import { useState } from 'react'
import { Text } from './Text'

const UrlText = ({ text = '', style }) => {
    const regex =
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/g
    const arr = text.match(regex)

    const [result, setResult] = useState(null)
    const makeText = () => {
        let list = []
        let pre = 0

        if (arr?.length)
            arr.map((link, ind) => {
                console.log('link', link)
                const start = text.indexOf(link)
                const end = start + link?.length
                list.push(<Text key={ind + 's'}>{text.slice(pre, start)}</Text>)
                list.push(
                    <Text key={ind + 'k'}>
                        <div
                            onClick={() => {
                                document.open(text.slice(start, end))
                            }}
                        >
                            <Text style={{ color: 'blue' }}>
                                {text.slice(start, end)}
                            </Text>
                        </div>
                    </Text>
                )
                pre += end
            })
        list.push(<Text key={'e'}>{text.slice(pre, text.length)}</Text>)
        setResult(list)
    }
    useEffect(() => {
        makeText()
    }, [text])

    return <Text style={style}>{result}</Text>
}

export default UrlText
