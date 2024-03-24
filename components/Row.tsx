
export function Row(props) {
    return (
      <div {...props} style={{...props.style,  flexDirection: "row" }}>
        {props.children}
      </div>
    );
  }