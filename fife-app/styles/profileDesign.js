import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    popup: {
        marginTop:200,zIndex:100,elevation: 100,maxHeight:200,backgroundColor:'white',

        flex:1,
        backgroundColor:'white',
        fontSize:30,
        padding:10,
        zIndex:100, 
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.6,
        shadowRadius: 6,
        borderRadius:8
    },
    buziness: {
        borderRadius:8,
        backgroundColor:'#fff8a2',
        margin:4,
        padding: 4

    }
})

export default styles;