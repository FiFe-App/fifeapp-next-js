import { useSmallerThan, useWindowSize } from '@/lib/functions'
import { FC, ReactNode } from 'react'

interface Props {
    children?: ReactNode,
    style?: Record<string, unknown>,
    className?: string,
    flex?: number|undefined,
    breakPoint?: number,
    reverse?: boolean,
    onLayout?: any,
}

export const Auto: FC<Props> = ({
    children,
    style,
    flex,
    breakPoint = 900,
    reverse=false,
    onLayout,
    className
}) => {

    return (
        <div
            style={style}
            className={'auto'}
        >
            {children}
        </div>
    )
}
