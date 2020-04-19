import { StyleSheet } from "react-native";
import {globalStyle, paddingOrMargin} from "./../../../../globalStyle";

export default StyleSheet.create({
    headerContainer: {
        ...globalStyle.__flex_all_center_row,
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "100%",
        backgroundColor: "blue"
        
    },
    logoutBtnContainer: {
        ...paddingOrMargin(10, 10),
        backgroundColor: "black",
        width: 'auto',
        height: 40,
        marginLeft: 10
    },
    incQContainer: {
        width: 40,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
        shadowColor: 'rgba(255, 255, 255, 1)',
        shadowOffset: {
          width: 1,
          height: 1
        },
        borderRadius: 20
    },
    incQText: {
        ...globalStyle.generic_text,
        width: '100%',
        height: '100%',
        color: "white",
        textAlign: "center",
        textAlignVertical: 'center', 
        textShadowColor: "red",
        fontWeight: "bold",
        fontSize: 15,
        // backgroundColor: 'red',
        marginRight: -50
    },
    plusMinusCont: {
        width: 10,
        height: 13,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        marginRight: -14
        // backgroundColor: 'blue'
    },
    plusMinusText: {
        ...globalStyle.generic_text,
        fontSize: 18,
        color: 'white',
        height: 7,
        lineHeight: 12,
        textAlign: 'center',
        textAlignVertical: 'center',
        // backgroundColor: "red"
    },
    

    ...globalStyle

});