const Loading = ({ color = '#ffde7e', style }:any) => {
    return (
        <div
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            }}
        >
            loading
        </div>
    )
}

export default Loading
