import {StyleSheet} from "react-native";
export function paddingOrMargin(a = 0, b = 0, c = 0, d = 0, type = "padding"){
    const p = {
    [type+"Top"]: 0,
    [type+"Bottom"]: 0,
    [type+"Left"]: 0,
    [type+"Right"]: 0 
    };
    if(!c && !d){
        p[type+"Top"] = a;
        p[type+"Bottom"] = a;
        p[type+"Left"] = b;
        p[type+"Right"] = b;
    }else{
        p[type+"Top"] = a;
        p[type+"Bottom"] = b;
        p[type+"Left"] = c;
        p[type+"Right"] = d;
    }
    return p;
}
export const globalStyle = StyleSheet.create( {
    __flex_all_center_row:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    generic_text:{
        fontFamily: "Topic-Bold",
        fontSize: 18,
        color: "black"
    },
    generic_block_container: {
        display: "flex",
        flexDirection: "column",
        flex: 1
        
    },
    flat_list_container: {
        alignSelf: "stretch",
    }, 
    pageContainer: {
        alignItems: "center",
    },
    headerTitle: {
        display: 'flex',
        flex: 1,
        backgroundColor: "blue",
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    }
});