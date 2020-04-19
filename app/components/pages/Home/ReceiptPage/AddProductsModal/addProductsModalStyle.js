import { StyleSheet } from "react-native";
import { globalStyle } from "../../../../../globalStyle";

const product_line = {
  marginTop: 10,
  marginBottom: 10,
};
const button_container = {
    flex: 1,
    width: '100%',
    height: 50,
    marginTop: 5,
    // backgroundColor: 'red'
};
export const constants = {
    item_bg_color: 'rgba(255, 253, 143, 0.2)'
}
export default StyleSheet.create({
  listContainer: {
    flex: 1
  },
  modal: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10
  },
  productContainer: {
      flex: 1,
      padding: 10
  },
  product_name: {
      ...product_line,
      ...globalStyle.generic_text,
      flex: 1,
  },
  bottom_container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: constants.item_bg_color,
      padding: 5,
      borderRadius: 10
  },
  left_container: {
      flex: 1,
    //   backgroundColor: 'blue',
      width: 200,
  },
  price: {
      ...product_line,
      ...globalStyle.generic_text,
  },
  tva: {
      ...product_line,
      ...globalStyle.generic_text,
  },
  right_container: {
      width: 45,
    //   backgroundColor: 'green'
  },
  substractButton: {
      ...button_container,
  },
  textButton: {
      ...globalStyle.generic_text,
    color: 'white',
    textAlignVertical: 'center',
    height: '100%'
  },
  textButtonInactive: {
      backgroundColor: 'grey'
  },
  addButton: {
      ...button_container,
  },
  submit_button: {
      width: '100%',
      height: 50
  },
  submit_button_text: {
    fontSize: 20
  }
});
