import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        backgroundColor: '#ffffff',
        //backgroundColor: '#f1f1f1',ú
        borderTopRightRadius:8,
        borderTopLeftRadius:8,
        borderTopWidth:0,
        margin:0,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: {height:4,width:0},
        shadowRadius: 2,
        zIndex:10
    }
})

export default styles;