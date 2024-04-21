import { useWindowSize } from '@/lib/functions'
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
    reverse,
    onLayout,
    className
}) => {
    const { width=0 } = useWindowSize()
    console.log()

    return (
        <div
            style={{
                flexDirection: reverse
                    ? width > breakPoint
                        ? 'column'
                        : 'row'
                    : width <= breakPoint
                      ? 'column'
                      : 'row',
                width: '100%',
                flex:
                    flex != undefined
                        ? flex == 0
                            ? undefined
                            : flex
                        : width <= breakPoint
                          ? undefined
                          : 1,
                ...style,
            }}
            className={className}
        >
            {children}
        </div>
    )
}
