import { globalStyle } from "../../globalStyle";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
        width: 30,
        height: 30,
        borderRadius: 5,
    },
    text: {
        ...globalStyle.generic_text,
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        width: '100%',
        height: '100%',

    }
})