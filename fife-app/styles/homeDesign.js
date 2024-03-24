import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    moduleContainer: {
        paddingBottom:5,
        paddingTop:5,
        justifyContent:'center',
        width:'100%',
        margin:5
    },
    module: {
        alignSelf:'stretch',
        backgroundColor:'white',
        flexGrow:1,
        flex:1,
        width: 200,
        margin:2,
        marginBottom:10,
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        borderRadius:8,
    },
    moduleText: {
        backgroundColor:'rgba(255, 255, 214,0)',
        padding:4,
        paddingLeft:8,
        borderRadius:8,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
    },
    moduleScrollView: {
        paddingHorizontal:20,
        marginHorizontal:5
    },
    bubble: {
        backgroundColor:'white',
        borderLeftWidth:0,
        marginLeft:5,
        width:30,
        height:30,
        position:'absolute',
        borderTopRightRadius:100,
    }
})

export default styles;