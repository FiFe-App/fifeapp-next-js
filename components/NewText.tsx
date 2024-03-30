import { Text, TextProps } from '@radix-ui/themes'
import classNames from 'classnames'
import { FC } from 'react'

type Props = {
    children: string
} & TextProps

export const NewText: FC<Props> = ({ children }) => {
    return <Text>{children}</Text>
}
