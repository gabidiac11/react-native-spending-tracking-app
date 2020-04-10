
import {StyleSheet} from "react-native";
// import * as globals from "../../../style/globals.js";
function paddingOrMargin(a = 0, b = 0, c = 0, d = 0, type = "padding"){
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
export default style = StyleSheet.create( {
    __flex_all_center_row:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        
    },
    generic_text:{
        fontFamily: "Topic-Bold",
        fontSize: 18,
        color: "black"
    },
    // end helper classes.................
    generic_block_container: {
        display: "flex",
        flexDirection: "column",
        flex: 1
        
    },
    receipt_bg_image: {
        // flex: 1,
        // width: '100%',
        marginBottom: 10
    },
    flat_list_container: {
        
        alignSelf: "stretch",
    }, 
    pageContainer: {
        alignItems: "center",
        
    },
    receiptContainer: {
        paddingLeft: 30,
        paddingRight:30,
        paddingTop: 10,
        paddingBottom: 20
    },
    receipt_product_item_container: {
        // height: 20
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        paddingBottom: 10
    },
    receipt_address: {
        textAlign: "center",
        paddingLeft: 30,
        paddingRight: 30
    },
    receipt_store_title: {
        textAlign: "center",
        marginBottom: 3,
        paddingTop: 5,
        fontSize: 20
    },
    receipt_title: {
        fontSize: 25,
        alignSelf: "stretch",
        textAlign: "center",
        ...paddingOrMargin(10, 10, null, null, "margin")
    },
    generic_cont_justify: {
        alignSelf: 'stretch',
        display: 'flex',
        justifyContent: 'space-between',
        borderStyle: 'dotted',
        flexDirection: "row"
    },
    generic_cont_center: {
        alignSelf: 'stretch',
        display: 'flex',
        justifyContent: 'center',
        borderStyle: 'dotted',
        flexDirection: "row"
    },
    receipt_date_cont: {
        paddingTop: 20,
        paddingBottom: 10
    },
    receipt_line: {
        paddingTop: 3,
        paddingBottom: 3
    },
    receipt_prod_head: {
        height: 30,
        // backgroundColor: "red",

        alignItems: "flex-start"
    },
    receipt_trash_button: {
        width: 50,
        backgroundColor: "black",
        height: "100%"
    },
    receipt_middle_side: {
        minHeight: 40,
        // backgroundColor: "red",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: "stretch",
        // width: 700,
        // backgroundColor: "yellow"
    },
    receipt_middle_left: {
        width: 200,
        height: 85,
        marginTop: 5,
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row"
        // backgroundColor: "black"
    },
    increase_btns_cont: {
        width: 40,
        height: 85,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 10
        // backgroundColor: "green"
    },
    inc_btn: {
        height: "47%",
        width: "100%",
        backgroundColor: "grey",
    },

    quantity_input_cont: {
        // width: 200,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        // backgroundColor: 'brown',
    },
    right_container_product: {
        // alignSelf: 'stretch',
        width: "125%",
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "green",
        justifyContent: "space-between"
    },
    receipt_middle_right: {

    },
    input_price: {
        width: 100,
        height: 40,
        // backgroundColor: "white"
    },
    text_size_input: {
        fontSize: 20,
    }, 
    input_price_text: {
        height: 40,
        padding: 0,
        borderColor: "transparent",
        borderWidth: 0,
        width: 100,
        fontFamily: "Topic-Bold"
    },
    text_quantity: {
        width: 60,
        // backgroundColor: 'blue',
        height: 20
    },

    product_total_price_cont: {
        width: '100%',
        height: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: "red"

        
    },
    product_text_total: {
        fontSize: 25
    }
});