import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import Button from "../../../../reusableComponents/Button/Button";
import { hybridStyle, style } from "./ReceptStyle";
import { useSelector, useDispatch } from "react-redux";

import {
  generateFloatNumberAndTextNumber,
  reduceNumberMatisse,
} from "./../../../../helpers/helperFunctions";
import FirebaseService from "./firebaseService";
import AddProductsModal from "./AddProductsModal/AddProductsModal";

export default function ReceiptPage(props) {
  const dispatch = useDispatch();
  const { receipts, stores, uid, incQ, tvas } = useSelector(
    ({
      auth: {
        user: { uid },
      },
      builder: {
        incQ,
        app_data: { receipts, stores, tvas },
      },
    }) => {
      return {
        uid,
        receipts,
        stores,
        incQ,
        tvas
      };
    }
  );

  const firebaseService = new FirebaseService({ uid, dispatch });
  
  const [local_price_modifyed, set_local_price_modifyed] = React.useState({});
  const [modalStoreId, setModalStoreId] = React.useState();
  
  let keys = Object.keys(receipts);
  for (let i = 0; i < keys.length; i++) {
    receipts[keys[i]].id = keys[i];
  }
  const receipts_arr = Object.entries(receipts).map(([id_receipt, receipt]) => {
    return {
      ...receipt,
      id: id_receipt,
      store: stores[receipts[id_receipt].storeId],
    };
  });

  const onChangeReceiptProductPriceInput = (
    text,
    { id_product, id_receipt }
  ) => {
    const { textNumber, floatNumber } = generateFloatNumberAndTextNumber(text);
    firebaseService.onUpdateReceiptProductPrice({
      id_receipt,
      id_product,
      price: floatNumber,
    });
    set_local_price_modifyed({
      ...local_price_modifyed,
      [id_product]: textNumber,
    });
  };
  const onIncQuantityReceiptProduct = (inc, { id_product, id_receipt }) => {
    const quantity =
      Math.floor(
        ((receipts[id_receipt].products[id_product].quantity || 0) +
          inc * incQ) *
          100
      ) / 100;
    console.log(quantity);
    firebaseService.onChangeReceiptProductQuantity({
      id_receipt,
      id_product,
      quantity,
    });
  };
  const onDeleteReceiptProduct = ({ id_receipt, id_product }) => {
    firebaseService.onChangeReceiptProductQuantity({
      id_receipt,
      id_product,
      quantity: 0,
    });
  };
  const onOpenAddProductsModal = (id_store) => {
    setModalStoreId(id_store);
  }
  const onCloseAddProductsModal = () => {
    setModalStoreId(undefined);
  }
  return (
    <>
    <AddProductsModal
        isModalVisible={modalStoreId !== undefined}
        products={!modalStoreId ? [] : Object.entries(stores[modalStoreId].products || {}).map(([store_id_product, product]) => ({
          ...product,
          store_id_product,
          tvaPercent: tvas[product.tva],
        }))}
        id_store={modalStoreId}
        onSelectProduct={onCloseAddProductsModal}
      />
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
            storeId,
            id: id_receipt /*deconstructing alias*/,
          },
        }) => {
          return (
            <ImageBackground
              style={hybridStyle.class_receipt_img_bg}
              source={require("../../../../../assets/img/receipt_bg.png")}
              imageStyle={style.background_image}
              resizeMode="cover"
            >
              <View style={hybridStyle.class_receipt_container}>
                <Text style={hybridStyle.class_store_name}>{store.name}</Text>
                <Text style={hybridStyle.class_receipt_address}>
                  {store.address}
                </Text>
                <Text style={hybridStyle.class_receipt_title}>BON FISCAL</Text>

                <Button
                  onPress={() => onOpenAddProductsModal(storeId)}
                  rightIcon={{ name: "cart-plus", size: 20 }}
                  content={"Add products "}
                  textStyle={{ fontSize: 23 }}
                  containerStyle={{
                    width: 200,
                    height: 40,
                    marginBottom: 20,
                    backgroundColor: "#00296b",
                  }}
                />

                {Object.keys(products).map((id_product) => {
                  const { name, price } = products[id_product];
                  const quantity = products[id_product].quantity || 0;
                  return (
                    <View
                      style={hybridStyle.class_receipt_products_cont}
                      key={id_product}
                    >
                      {/* title and trash btn */}
                      <View style={hybridStyle.class_receipt_prod_upper_side}>
                        <View>
                          <Text
                            style={{
                              ...style.generic_text,
                              ...style.text_size_input,
                              ...style.product_receipt_name,
                            }}
                          >
                            {name}
                          </Text>
                        </View>
                        <Button
                          onPress={() => {
                            onDeleteReceiptProduct({ id_receipt, id_product });
                          }}
                          containerStyle={{ backgroundColor: "#6b0000", alignItems: 'center', justifyContent: 'center' }}
                          rightIcon={{ name: "trash", color: "white" }}
                        />
                      </View>
                      {/* middle side */}
                      <View style={hybridStyle.class_receipt_prod_middle_side}>
                        <View style={hybridStyle.class_receipt_middle_left}>
                          <View
                            style={hybridStyle.class_receipt_quantity_btns_cont}
                          >
                            <Button
                              containerStyle={{
                                ...hybridStyle.class_receipt_q_btn,
                                ...style.__flex_all_center_row,
                                backgroundColor: "#005959",
                              }}
                              onPress={() => {
                                onIncQuantityReceiptProduct(1, {
                                  id_product,
                                  id_receipt,
                                });
                              }}
                              rightIcon={{ name: "plus" }}
                            />
                            <Button
                              containerStyle={{
                                ...hybridStyle.class_receipt_q_btn,
                                ...style.__flex_all_center_row,
                                backgroundColor: "#005959",
                              }}
                              onPress={() => {
                                onIncQuantityReceiptProduct(-1, {
                                  id_product,
                                  id_receipt,
                                });
                              }}
                              rightIcon={{ name: "minus" }}
                            />
                          </View>
                          <View style={{ ...style.right_container_product }}>
                            <View style={{ ...style.quantity_input_cont }}>
                              <View
                                style={{
                                  ...style.generic_text,
                                  ...style.text_quantity,
                                }}
                              >
                                <Text
                                  style={{
                                    ...style.generic_text,
                                    ...style.text_size_input,
                                  }}
                                >
                                  {" "}
                                  {`${quantity || 0} BUC x`}{" "}
                                </Text>
                              </View>
                              <View style={hybridStyle.class_name_input_price}>
                                <Input
                                  inputStyle={{
                                    ...style.generic_text,
                                    ...style.input_price_text,
                                    ...style.text_size_input,
                                    fontFamily: "Topic-Bold",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    borderWidth: 0,
                                  }}
                                  fontFamily="Topic-Bold"
                                  placeholder="price"
                                  onChangeText={(text) => {
                                    onChangeReceiptProductPriceInput(text, {
                                      id_product,
                                      id_receipt,
                                    });
                                  }}
                                  value={
                                    local_price_modifyed[id_product] ||
                                    local_price_modifyed[id_product] === ""
                                      ? local_price_modifyed[id_product]
                                      : String(price)
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
                                    ...style.product_text_total,
                                  }}
                                >
                                  {Math.floor(price * quantity * 100) / 100}
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
                    <Text
                      style={{ ...style.generic_text, ...style.label_line }}
                    >
                      Total
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        ...style.generic_text,
                        ...style.product_text_total,
                      }}
                    >
                      {Object.entries(products)
                        .map(([id_product, { price, quantity }]) =>
                          reduceNumberMatisse(price * (quantity || 0))
                        )
                        .reduce(
                          (total, current) =>
                            reduceNumberMatisse(total + current),
                          0
                        )}
                    </Text>
                  </View>
                </View>
                <View style={hybridStyle.class_receipt_line}>
                  <View>
                    <Text
                      style={{ ...style.generic_text, ...style.label_line }}
                    >
                      A - TVA 9%
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        ...style.generic_text,
                        ...style.product_text_total,
                      }}
                    >
                      0
                    </Text>
                  </View>
                </View>
                <View style={hybridStyle.class_receipt_line}>
                  <View>
                    <Text
                      style={{ ...style.generic_text, ...style.label_line }}
                    >
                      B - TVA 9%
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        ...style.generic_text,
                        ...style.product_text_total,
                      }}
                    >
                      0
                    </Text>
                  </View>
                </View>
                <View style={hybridStyle.class_receipt_date_cont}>
                  <Text style={hybridStyle.class_receipt_date}>{date}</Text>
                </View>
              </View>
            </ImageBackground>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
    </>
  );
}
