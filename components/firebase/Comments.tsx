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
import { Text } from '../Text'
import router from 'next/router'
import { Box, Flex } from '@radix-ui/themes'

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

    console.log(list);
    

    return (
        <Box
            style={{ flex: 1, ...style }}
            onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
            {!justComments && (
                <>
                    <Row style={{ flex: 1 }}>
                        <Box style={{ flexGrow: 1 }}>
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
                        </Box>
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
                    <Text size={20} style={{ marginLeft: 10, marginTop: 10 }}>
                        Kommentek:
                    </Text>
                </>
            )}
            {!!list?.length && (
                <Flex
                    m="2"
                    mr="3"
                    wrap="wrap"
                    direction="row"
                >
                    {list.map((comment, ind) => {
                        return (
                            <Box
                                key={'comment' + ind}
                                style={{
                                    background: 'white',
                                    padding: 5,
                                    margin: 5,
                                    maxWidth: '100%',
                                    ...commentStyle,
                                }}
                            >
                                <Box
                                    onClick={() => {
                                        if (comment?.uid)
                                            navigation.push({
                                                pathname: 'profil',
                                                params: { uid: comment.uid },
                                            })
                                    }}
                                >
                                    <Text>
                                        <b>{comment.author}</b>
                                    </Text>
                                </Box>

                                <UrlText text={comment.text} />
                            </Box>
                        )
                    })}
                </Flex>
            )}
            {downloading ? (
                <Loading />
            ) : (
                !list?.length && (
                    <Text style={{ padding: 20 }}>
                        Még nem érkezett komment
                    </Text>
                )
            )}
        </Box>
    )
}

export default Comments
