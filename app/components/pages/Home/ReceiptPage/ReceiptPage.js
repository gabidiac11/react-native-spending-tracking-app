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
import {hybridStyle, style} from "./ReceptStyle";
import { useSelector, useDispatch } from "react-redux";

import {generateFloatNumberAndTextNumber} from "./../../../../helpers/helperFunctions";
import FirebaseService from "./firebaseService";

export default function ReceiptPage(props) {
  const dispatch = useDispatch();
  const { receipts, stores, uid } = useSelector(
    ({
      auth: {user: {uid}},
      builder: {
        app_data: { receipts, stores }
      }
    }) => {
      return {
        uid,
        receipts,
        stores
      };
    }
  );
  const firebaseService = new FirebaseService({uid, dispatch});
  const [local_price_modifyed, set_local_price_modifyed] = React.useState({});
  const [incQ, setIncQ] = React.useState(1);
  let keys = Object.keys(receipts);
  for (let i = 0; i < keys.length; i++) {
    receipts[keys[i]].id = keys[i];
  }
  const receipts_arr = Object.keys(receipts).map(id_receipt => {
    return {
      ...receipts[id_receipt],
      id: id_receipt,
      store: stores[receipts[id_receipt].storeId]
    };
  });

  const onChangeReceiptProductPriceInput = (text, {id_product, id_receipt}) => {
    const {
      textNumber,
      floatNumber
    } = generateFloatNumberAndTextNumber(text);
    firebaseService.onUpdateReceiptProductPrice({id_receipt, id_product, price: floatNumber})
    set_local_price_modifyed({
      ...local_price_modifyed,
      [id_product]: textNumber
    });
  };
  const onIncQuantityReceiptProduct = (inc, {id_product, id_receipt}) => {
    const quantity = (receipts[id_receipt].products[id_product].quantity || 0) + (inc*incQ);
    firebaseService.onChangeReceiptProductQuantity({id_receipt, id_product, quantity});
  };
  const onDeleteReceiptProduct = ({id_receipt, id_product}) => {
    firebaseService.onChangeReceiptProductQuantity({id_receipt, id_product, quantity: 0});
  }
  return (
    <SafeAreaView
      style={{ ...style.generic_block_container, ...style.pageContainer }}
    >
      <FlatList
        style={{ ...style.flat_list_container }}
        data={receipts_arr}
        renderItem={({
          item: {
            products,
            date,
            store,
            id: id_receipt /*deconstructing alias*/
          }
        }) => {
          return (
            <ImageBackground
              style={hybridStyle.class_receipt_img_bg}
              source={require("../../../../../assets/img/receipt_bg.png")}
              resizeMode={"cover"}
            >
              <View style={hybridStyle.class_receipt_container}>
                <Text style={hybridStyle.class_store_name}>{store.name}</Text>
                <Text style={hybridStyle.class_receipt_address}>{store.address}</Text>
                <Text style={hybridStyle.class_receipt_title}>BON FISCAL</Text>
                {Object.keys(products).map(id_product => {
                  const { name, price, quantity } = products[id_product];
                  return (
                    <View style={hybridStyle.class_receipt_products_cont} key={id_product}>
                      {/* title and trash btn */}
                      <View style={hybridStyle.class_receipt_prod_upper_side}>
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
                          buttonStyle={hybridStyle.class_trash_button}
                          onPress={() => {
                            onDeleteReceiptProduct({id_receipt, id_product})
                          }}
                          color="black"
                          title="   X    "
                        />
                      </View>
                      {/* middle side */}
                      <View style={hybridStyle.class_receipt_prod_middle_side}>
                        <View style={hybridStyle.class_receipt_middle_left}>
                          <View style={hybridStyle.class_receipt_quantity_btns_cont}>
                            <TouchableOpacity
                              style={{
                                ...hybridStyle.class_receipt_q_btn,
                                ...style.__flex_all_center_row
                              }}
                              onPress={() => {
                                onIncQuantityReceiptProduct(1, {id_product, id_receipt});
                              }}
                            >
                              <Text
                                style={{
                                  ...style.generic_text,
                                  fontSize: 25
                                }}
                              >
                                +
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                ...hybridStyle.class_receipt_q_btn,
                                ...style.__flex_all_center_row
                              }}
                              onPress={() => {
                                onIncQuantityReceiptProduct(-1, {id_product, id_receipt});
                              }}
                            >
                              <Text
                                style={{
                                  ...style.generic_text,
                                  fontSize: 25
                                }}
                              >
                                -
                              </Text>
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
                              <View style={hybridStyle.class_name_input_price}>
                                <Input
                                  inputStyle={{
                                    ...style.generic_text,
                                    ...style.input_price_text,
                                    ...style.text_size_input
                                  }}
                                  placeholder="price"
                                  onChangeText={text => {
                                    onChangeReceiptProductPriceInput(
                                      text, {
                                      id_product,
                                      id_receipt
                                    });
                                  }}
                                  value={
                                    local_price_modifyed[
                                      id_product
                                    ] ||
                                    local_price_modifyed[
                                      id_product
                                    ] === "" ?
                                    local_price_modifyed[
                                      id_product
                                    ] : String(price)
                                  }
                                  fontFamily={"Topic-Bold"}
                                  // theme={{ fonts: { regular: "" } }}
                                />
                              </View>
                            </View>
                            {/* total line side */}
                            <View style={{ ...style.product_total_price_cont }}>
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
                <View style={hybridStyle.class_receipt_line}>
                  <View>
                    <Text style={{ ...style.generic_text }}>Total</Text>
                  </View>
                  <View>
                    <Text style={{ ...style.generic_text }}>88</Text>
                  </View>
                </View>
                <View style={hybridStyle.class_receipt_line}>
                  <View>
                    <Text style={{ ...style.generic_text }}>A - TVA 9%</Text>
                  </View>
                  <View>
                    <Text style={{ ...style.generic_text }}>0</Text>
                  </View>
                </View>
                <View style={hybridStyle.class_receipt_line}>
                  <View>
                    <Text style={{ ...style.generic_text }}>B - TVA 9%</Text>
                  </View>
                  <View>
                    <Text style={{ ...style.generic_text }}>0</Text>
                  </View>
                </View>
                <View style={hybridStyle.class_receipt_date_cont}>
                  <Text style={hybridStyle.class_receipt_date}>{date}</Text>
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
