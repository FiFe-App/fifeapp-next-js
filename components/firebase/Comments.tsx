import {
    getDatabase,
    limitToLast,
    off,
    onChildAdded,
    push,
    query,
    ref,
    set,
} from 'firebase/database'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../Loading'
import { ArrowRedoOutline } from 'react-ionicons'
import UrlText from '../UrlText'
import { Row } from '../Row'
import { NewButton } from '../NewButton'
import { MyText } from '../MyText'
import router from 'next/router'

const Comments = ({
    style,
    path,
    placeholder,
    limit,
    justComments,
    commentStyle,
}) => {
    const [list, setList] = useState([])
    const navigation = router
    const [width, setWidth] = useState(0)

    const uid = useSelector((state) => state.user.uid)
    const name = useSelector((state) => state.user.name)
    const [author, setAuthor] = useState(name)
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [downloading, setDownloading] = useState(true)
    const db = getDatabase()

    const handleSend = async () => {
        if (author && text) {
            setLoading(true)
            const newPostRef = push(ref(db, path))
            set(newPostRef, {
                author,
                text,
                uid,
            })
                .then((res) => {
                    setLoading(false)
                    setText('')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        setList([])

        const q = limit
            ? query(ref(db, path), limitToLast(limit))
            : ref(db, path)

        onChildAdded(q, (data) => {
            setList((old) => [data.val(), ...old])
            setDownloading(false)
        })
        setTimeout(() => {
            setDownloading(false)
        }, 3000)
        return () => {
            off(ref(db, path), 'child_added')
        }
    }, [path])

    return (
        <div
            style={{ flex: 1, ...style }}
            onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
            {!justComments && (
                <>
                    <Row style={{ flex: 1 }}>
                        <div style={{ flexGrow: 1 }}>
                            {!name && (
                                <input
                                    style={{
                                        marginRight: 5,
                                        marginBottom: 5,
                                        padding: 10,
                                        backgroundColor: '#ffffff',
                                    }}
                                    value={author}
                                    onChangeText={setAuthor}
                                    placeholder="Név"
                                />
                            )}
                            <input
                                style={{
                                    flex: 1,
                                    marginRight: 5,
                                    marginBottom: 0,
                                    padding: 10,
                                    backgroundColor: '#ffffff',
                                }}
                                multiline
                                rows={2}
                                value={text}
                                onChangeText={setText}
                                placeholder={
                                    placeholder ? placeholder : 'Kommented'
                                }
                            />
                        </div>
                        <NewButton
                            title={
                                width > 300 ? (
                                    'Küldés'
                                ) : (
                                    <ArrowRedoOutline size={30} color="black" />
                                )
                            }
                            onPress={handleSend}
                            disabled={!author || !text}
                            style={{ height: '100%', margin: 0 }}
                            loading={loading}
                        />
                    </Row>
                    <MyText size={20} style={{ marginLeft: 10, marginTop: 10 }}>
                        Kommentek:
                    </MyText>
                </>
            )}
            {!!list?.length && (
                <div
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        margin: 10,
                        marginRight: 15,
                    }}
                >
                    {list.map((comment, ind) => {
                        return (
                            <div
                                key={'comment' + ind}
                                style={{
                                    background: 'white',
                                    padding: 5,
                                    margin: 5,
                                    maxWidth: '100%',
                                    ...commentStyle,
                                }}
                            >
                                <div
                                    onClick={() => {
                                        if (comment?.uid)
                                            navigation.push({
                                                pathname: 'profil',
                                                params: { uid: comment.uid },
                                            })
                                    }}
                                >
                                    <MyText>
                                        <b>{comment.author}</b>
                                    </MyText>
                                </div>

                                <UrlText text={comment.text} />
                            </div>
                        )
                    })}
                </div>
            )}
            {downloading ? (
                <Loading />
            ) : (
                !list?.length && (
                    <MyText style={{ padding: 20 }}>
                        Még nem érkezett komment
                    </MyText>
                )
            )}
        </div>
    )
}

export default Comments
