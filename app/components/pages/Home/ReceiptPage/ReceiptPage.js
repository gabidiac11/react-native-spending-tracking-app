import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import style from "./ReceptStyle";

const receipt_bg = { uri: "../../../../../assets/img/receipt_bg.png" };

function mapStateToProps({
  builder: {
    app_data: { receipts, stores }
  }
}) {
  return {
    receipts,
    stores
  };
}
const {
  class_receipt_img_bg,
  class_receipt_container,
  class_store_name,
  class_receipt_address,
  class_receipt_title,
  class_receipt_products_cont,
  class_receipt_prod_upper_side,
  class_trash_button,
  class_receipt_prod_middle_side,
  class_receipt_middle_left,
  class_receipt_quantity_btns_cont,
  class_receipt_q_btn,
  class_receipt_date_cont,
  class_receipt_date,
  class_receipt_line,
  class_name_input_price
} = StyleSheet.create({
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
    ...style.receipt_product_item_container,
    ...style.receipt_line
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
class ReceiptPage extends Component {
  constructor(props) {
    super(props);
    this.state;
  }
  render() {
    let { stores, receipts } = this.props;
    let keys = Object.keys(receipts);
    for (let i = 0; i < keys.length; i++) {
      receipts[keys[i]].id = keys[i];
    }
    console.clear();
    console.log(receipts);
    receipts = Object.keys(receipts).map(id_receipt => {
      return {
        ...receipts[id_receipt],
        id: id_receipt,
        store: stores[receipts[id_receipt].storeId]
      };
    });
    return (
      <SafeAreaView
        style={{ ...style.generic_block_container, ...style.pageContainer }}
      >
        <FlatList
          style={{ ...style.flat_list_container }}
          data={receipts}
          renderItem={({ item: { products, date, store } }) => {
            return (
              <ImageBackground
                style={class_receipt_img_bg}
                source={require("../../../../../assets/img/receipt_bg.png")}
                resizeMode={"cover"}
              >
                <View style={class_receipt_container}>
                  <Text style={class_store_name}>{store.name}</Text>
                  <Text style={class_receipt_address}>{store.address}</Text>
                  <Text style={class_receipt_title}>BON FISCAL</Text>
                  {Object.keys(products).map(id_product => {
                    const { name, price, quantity } = products[id_product];
                    return (
                      <View
                        style={class_receipt_products_cont}
                        key={id_product}
                      >
                        {/* title and trash btn */}
                        <View style={class_receipt_prod_upper_side}>
                          <View>
                            <Text
                              style={{
                                ...style.generic_text,
                                ...style.text_size_input
                              }}
                            >
                              {name}
                            </Text>
                          </View>
                          <Button
                            buttonStyle={class_trash_button}
                            color="black"
                            title="   X    "
                          />
                        </View>
                        {/* middle side */}
                        <View style={class_receipt_prod_middle_side}>
                          <View style={class_receipt_middle_left}>
                            <View style={class_receipt_quantity_btns_cont}>
                              <TouchableOpacity style={{...class_receipt_q_btn, ...style.__flex_all_center_row}}>
                              <Text style={{...style.generic_text, fontSize: 25}}>+</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={{...class_receipt_q_btn, ...style.__flex_all_center_row}}>
                                <Text style={{...style.generic_text, fontSize: 25}}>-</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={{ ...style.right_container_product }}>
                              <View style={{ ...style.quantity_input_cont }}>
                                <View
                                  style={{
                                    ...style.generic_text,
                                    ...style.text_quantity
                                  }}
                                >
                                  <Text
                                    style={{
                                      ...style.generic_text,
                                      ...style.text_size_input
                                    }}
                                  >
                                    {" "}
                                    {`${quantity || 0} BUX x`}{" "}
                                  </Text>
                                </View>
                                <View style={class_name_input_price}>
                                  <Input
                                    inputStyle={{
                                      ...style.generic_text,
                                      ...style.input_price_text,
                                      ...style.text_size_input
                                    }}
                                    placeholder="price"
                                    onChangeText={text => {}}
                                    value={price || 0}
                                  />
                                </View>
                              </View>
                              {/* total line side */}
                              <View
                                style={{ ...style.product_total_price_cont }}
                              >
                                <View>
                                  <Text
                                    style={{
                                      ...style.generic_text,
                                      ...style.product_text_total
                                    }}
                                  >
                                    10
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                  <View style={class_receipt_line}>
                    <View>
                      <Text style={{ ...style.generic_text }}>Total</Text>
                    </View>
                    <View>
                      <Text style={{ ...style.generic_text }}>88</Text>
                    </View>
                  </View>
                  <View style={class_receipt_line}>
                    <View>
                      <Text style={{ ...style.generic_text }}>A - TVA 9%</Text>
                    </View>
                    <View>
                      <Text style={{ ...style.generic_text }}>0</Text>
                    </View>
                  </View>
                  <View style={class_receipt_line}>
                    <View>
                      <Text style={{ ...style.generic_text }}>B - TVA 9%</Text>
                    </View>
                    <View>
                      <Text style={{ ...style.generic_text }}>0</Text>
                    </View>
                  </View>
                  <View style={class_receipt_date_cont}>
                    <Text style={class_receipt_date}>{date}</Text>
                  </View>
                </View>
              </ImageBackground>
            );
          }}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps)(ReceiptPage);
