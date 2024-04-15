export function Row(props:any) {
    return (
        <div {...props} style={{ ...props.style, flexDirection: 'row' }}>
            {props.children}
        </div>
    )
}
