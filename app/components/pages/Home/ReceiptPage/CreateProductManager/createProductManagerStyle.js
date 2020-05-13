import { StyleSheet } from "react-native"
import {globalStyle} from "./../../../../../globalStyle";

const input_text = {
    ...globalStyle.generic_text
}
const secondRow = {
    height: 40,
    borderWidth: 0
};
const flexButtons = {
    paddingBottom: 10
}

export default StyleSheet.create({
    container: {
        paddingTop: 3,
        height: 150,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopWidth: 2,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        borderColor: 'grey'
    },
    name: {
        height: 40,
        padding: 0
    },
    name_input: {
        ...input_text,
        height: 40,
        padding: 0
    },
    bottom_container: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        height: 50
    },
    left_container: {
        flex: 1,
        alignSelf: 'stretch',
    },
    inputsFlexContainer: {
        height: 50,
        marginBottom: 7,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
    },
    price: {
        width: "30%",
        ...secondRow,
    },
    price_input: {
        ...input_text,
        borderWidth: 0,
        ...secondRow
    },
    tva: {
        width: 150,
        height: "100%",
        // backgroundColor: 'rgba(0,0,0,0.05)',
        marginRight: 10,
        ...secondRow,
        ...globalStyle.generic_text
    },
    category: {
        ...secondRow
        
    },
    utility: {
       height: 50,
       paddingRight: 5,
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       ...flexButtons,
       
    },
    utility_first_child: {
        paddingLeft: 20,
        paddingRight: 20, 
        paddingTop: 5,
        paddingBottom: 5,
        height: "100%",

        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopEndRadius: 30,
        borderBottomLeftRadius: 20,
        backgroundColor: '#3a60de'
    },
    utility_text: {
        ...globalStyle.generic_text,
        color: "white",
        marginRight: 10,
        textShadowColor: 'black',
        textShadowRadius: 2
    },
    right_container: {
        width: 60,
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...flexButtons
    },
    submit_button: (active) => ({
        width: "100%",
        height: "100%",
        backgroundColor: active ? 'rgba(143, 0, 0, 1)' : 'rgba(143, 0, 0, 0.2)',
        borderTopEndRadius: 20,
        borderBottomLeftRadius: 30,
        textAlignVertical: 'center'
    })
});