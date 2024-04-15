import { FC, ReactNode } from 'react'
import classNames from 'classnames'

interface Props {
    title?: boolean
    size?: number
    contained?: boolean
    bold?: boolean
    light?: boolean
    selectable?: boolean
    children?: ReactNode
    style?: Record<string, unknown>
}

export const Text: FC<Props> = ({
    title,
    size,
    contained,
    bold,
    light,
    selectable,
    children,
    ...props
}) => {
    const classes = classNames({
        container: contained,
    })

    return (
        <span
            {...props}
            className={classes}
            style={{
                ...(title && {
                    fontSize: 22,
                    marginTop: 14,
                    fontWeight: 'bold',
                }),
                ...(bold && { fontWeight: 'bold' }),
                ...(light && { fontWeight: '200', color: 'gray' }),
                ...(size && { fontSize: size }),
                ...(!selectable && { userSelect: 'none' }),
                ...props?.style,
            }}
        >
            {children}
        </span>
    )
}
