import { useEffect, useRef, useState } from 'react'
import { shadeColor, isBright, useWindowSize } from '@/lib/functions'

export function NewButton({
    title,
    onPress,
    disabled,
    selected,
    style,
    textStyle,
    floating,
    icon,
    color = '#fdcf99',
    info,
    loading = false,
}) {
    const ref = useRef()
    const isHovered = false
    const [rect, setRect] = useState(null)
    const { width } = useWindowSize()

    const [bgColor, setBgColor] = useState(icon ? 'transparent' : color)

    useEffect(() => {
        setBgColor(color)
    }, [color])

    const handleFocus = () => {
        setBgColor(shadeColor(color, -10))
    }
    useEffect(() => {
        if (rect) console.log('rect', rect.x, width)
    }, [rect])
    return (
        <>
            <div
                ref={ref}
                onLayout={(event) => {
                    //setRect(event.nativeEvent.layout.)
                }}
                style={{
                    margin: 0,
                    padding: 0,
                    width: 'unset',
                    height: 'unset',
                    alignItems: 'unset',
                    boxShadow: 'unset',
                    border: 'none',
                    ...style,
                }}
            >
                <div
                    onPressOut={() => setBgColor(color)}
                    onClick={() => {
                        setBgColor(color)
                        handleFocus()
                    }}
                    style={{
                        ...styles.newButton,
                        ...(floating && {
                            shadowColor: '#000',
                            shadowOffset: { width: 4, height: 4 },
                            shadowOpacity: 0.5,
                            shadowRadius: 3,
                        }),
                        ...{
                            backgroundColor: bgColor,
                            opacity: disabled ? 0.2 : 1,
                            height: 50,
                        },
                        ...(icon && { width: 50, borderRadius: 100 }),
                        ...style,
                    }}
                    onPress={onPress}
                    disabled={disabled}
                >
                    {!loading ? (
                        <span
                            style={{
                                fontWeight: 'bold',
                                color: isBright(bgColor),
                                fontSize: 16,
                                ...textStyle,
                            }}
                        >
                            {title}
                        </span>
                    ) : (
                        <span>loading</span>
                    )}
                </div>
            </div>
            {info && rect && isHovered && (
                <span
                    style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: 8,
                        marginTop: rect.height + 10,
                        left: width / 2 > rect.x ? rect.x : undefined,
                        right: width / 2 <= rect.x ? width - rect.x : undefined,
                        zIndex: 100,
                        padding: 10,
                    }}
                >
                    {info}
                </span>
            )}
        </>
    )
}

const styles = {
    titleStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        alignItems: 'center',
        width: 50,
        height: 50,
        justifyContent: 'center',
        borderRadius: 8,
        right: 30,
        bottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 12,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.0,

        elevation: 24,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'crimson',
    },
    newButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 20,
        margin: 5,
        padding: 8,
        cursor: 'pointer',
    },
}
