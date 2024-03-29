const Loading = ({ color = '#ffde7e', style }) => {
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
