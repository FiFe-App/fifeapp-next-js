'use client'

import { useWindowSize } from '@/lib/functions'
import { useEffect, useState } from 'react'

const BasePage = ({
    children,
    style,
    full,
    title,
    noScroll = false,
    noFooter = false,
}: any) => {
    const { width=0, height } = useWindowSize()
    const [innerHeight, setInnerHeight] = useState(height)
    const [outerHeight, setOuterHeight] = useState(height)

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    width: '100%',
                    alignItems: full ? 'stretch' : 'center',
                    overflowY: !noScroll ? 'auto' : 'hidden',
                    zIndex: -1
                }}
            >
                <div
                    style={{
                        paddingHorizontal: width <= 900 ? 5 : 50,
                        paddingTop: width <= 900 ? 5 : 50,
                        maxWidth: full ? 'none' : 800,
                        ...style,
                    }}
                >
                    {children}
                </div>
            </div>
        </>
    )
}

export default BasePage
