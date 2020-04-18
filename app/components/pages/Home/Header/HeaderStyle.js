import { StyleSheet } from "react-native";
import {globalStyle} from "app/globalStyle";

const style = StyleSheet.create({
    incQText: {
        width: 100
    },
    headerContainer: {
        ...globalStyle.__flex_all_center_row,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        backgroundColor: "red",
    }
});
export default StyleSheet.create({
    ...style,
    ...globalStyle
})