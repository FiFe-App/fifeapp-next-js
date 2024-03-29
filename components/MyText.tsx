export const MyText = (props) => {
    const { title, size, contained, bold, light, selectable } = props
    return (
        <span
            {...props}
            className={contained && 'container'}
            style={{
                ...{ letterSpacing: -1 },
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
            {props?.children}
        </span>
    )
}
