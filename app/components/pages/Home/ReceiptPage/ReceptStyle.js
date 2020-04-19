
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
export const style = StyleSheet.create( {
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
        marginBottom: 10
    },
    background_image: {
        alignSelf: 'stretch'
    },  
    flat_list_container: {
        
        alignSelf: "stretch",
    }, 
    pageContainer: {
        alignItems: "center",
        
    },
    receiptContainer: {
        alignSelf: "stretch",
        paddingLeft: 20,
        paddingRight:20,
        paddingTop: 10,
        paddingBottom: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: 'white'
    },
    receipt_product_item_container: {
        alignSelf: 'stretch',
        marginBottom: 10,
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopColor: "rgba(0, 0, 0, 0.3)",
        borderTopWidth: 5,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#f5ffff',
        ...(() => {
            const pr = {color:"rgba(0,0,0,0.06)", width: 2};
            return {
                borderLeftColor: pr.color,
                borderRightColor: pr.color,
                borderLeftWidth: pr.width,
                borderRightWidth: pr.width
            }
        })(),
        shadowOffset:{  width: 5,  height: 5,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    receipt_address: {
        textAlign: "center",
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 15
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
    product_receipt_name: {
        fontSize: 22
    }, 
    receipt_date_cont: {
        paddingTop: 20,
        paddingBottom: 10
    },
    receipt_line: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    receipt_prod_head: {
        height: 30,
        // backgroundColor: "red",

        alignItems: "flex-start"
    },
    receipt_trash_button: {
        width: 25,
        backgroundColor: "black",
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
        width: "auto",
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
        fontSize: 20,
        width: 30,
        textAlign: 'center'
    },
    label_line: {
        fontSize: 20
    }
});
export const hybridStyle = StyleSheet.create({
    class_receipt_img_bg: {
      ...style.generic_block_container,
      ...style.receipt_bg_image
    },
    class_receipt_container: {
      ...style.generic_block_container,
      ...style.receiptContainer
    },
    class_store_name: {
      ...style.generic_text,
      ...style.receipt_store_title
    },
    class_receipt_address: { ...style.generic_text, ...style.receipt_address },
    class_receipt_title: { ...style.generic_text, ...style.receipt_title },
    class_receipt_products_cont: {
      ...style.generic_block_container,
      ...style.receipt_line,
      ...style.receipt_product_item_container,
    },
    class_receipt_prod_upper_side: {
      ...style.generic_cont_justify,
      ...style.receipt_prod_head
    },
    class_trash_button: {
      ...style.receipt_trash_button
    },
    class_receipt_prod_middle_side: {
      ...style.generic_cont_justify,
      ...style.receipt_middle_side
    },
    class_receipt_middle_left: {
      ...style.receipt_middle_left
    },
    class_receipt_quantity_btns_cont: {
      ...style.increase_btns_cont
    },
    class_receipt_q_btn: {
      ...style.inc_btn
    },
    class_receipt_date: {
      ...style.generic_text,
      ...style.receipt_date_cont
    },
    class_receipt_date_cont: {
      ...style.generic_cont_center,
      ...style.receipt_line
    },
    class_receipt_line: {
      ...style.generic_cont_justify,
      ...style.receipt_line
    },
    class_name_input_price: {
      ...style.input_price
    }
  });