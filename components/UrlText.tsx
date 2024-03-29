import { useEffect } from 'react'
import { useState } from 'react'
import { MyText } from './MyText'

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
                list.push(
                    <MyText key={ind + 's'}>{text.slice(pre, start)}</MyText>
                )
                list.push(
                    <MyText key={ind + 'k'}>
                        <div
                            onClick={() => {
                                document.open(text.slice(start, end))
                            }}
                        >
                            <MyText style={{ color: 'blue' }}>
                                {text.slice(start, end)}
                            </MyText>
                        </div>
                    </MyText>
                )
                pre += end
            })
        list.push(<MyText key={'e'}>{text.slice(pre, text.length)}</MyText>)
    }
    useEffect(() => {
        makeText()
    }, [text])

    return <MyText style={style}>{result}</MyText>
}

export default UrlText
