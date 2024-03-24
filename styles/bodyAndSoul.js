import { StyleSheet } from "react-native";

const bgColor = '#1f001f'
const color = '#800080'

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:30,
        alignItems:'center',
        backgroundColor: bgColor,
        borderTopWidth:0,
        margin:0,
    },
    titleAnimation: {
        borderRadius: 100,
        paddingTop:10,
        backgroundColor: color,
    },
    title: {
        fontSize: 100,
        color:'white',
        cursor: 'pointer'
    },
    text: {
        textAlign:'center',
        fontSize: 30,
        color:'white'
    },
    circle: {
        borderRadius:1000,
        position: 'absolute',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#1b8067',
        width:500,
        height:500,
    }
})

export default styles;