import Image from "next/image"

export const Smiley = ({style}) => {
    const size = 0

    const handleGrow = () => {
      if (size > 60) {}
    }
    return (
      <div                // Special animatable View
      style={{
        transform: [{ scale: size }],
        transformOrigin:'50% 30%'
      ,...style}}
      >
      <div onClick={handleGrow}>
        <Image src={require('@/assets/logo.png')} style={{width:50,height:50,zIndex:10}}/>
      </div>
    </div>
    )
  }