import { StyleSheet } from "react-native";
import { globalStyle } from "../../../../../globalStyle";

const product_line = {
  marginTop: 10,
  marginBottom: 10,
};
const modalSidePadding = 10;

const button_container = {
    flex: 1,
    width: 50,
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
      padding: modalSidePadding
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
      width: 55,
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

  action_buttons_container: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: modalSidePadding,
    paddingRight: modalSidePadding,
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  submit_button:  {
    width: 130,
    height: "100%",
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 20
  },
  submit_button_text: {
    fontSize: 20
  },
  show_product_form: {
    height: "100%",
    flex: 1,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 30,
    backgroundColor: '#ba8900'
  },
  add_btn_: {
    backgroundColor: '#24b300'
  },
  go_back_btn_: {
    // backgroundColor: '#d1d1d1',
    // color: 'black'
  }
});
