import React, { Component, useContext } from "react";
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

import AddProductsModal from './AddProductsModal/AddProductsModal';
import { FirebaseServiceContext } from "../../../firebaseService";

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
  const firebaseContext = useContext(FirebaseServiceContext);
  const {firebaseService} = firebaseContext;
  const [local_price_modifyed, set_local_price_modifyed] = React.useState({});
  const [modalStoreAndReceiptId, setModalStoreAndReceiptId] = React.useState({
    id_store: undefined, id_receipt: undefined
    // id_store: "04fb7ac4-f003-46c0-a8eb-7cca7ba075ef", id_receipt: "-LvfXZ3084XxTZl2yQXV"
  });
  
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
    firebaseService.updateAndDispatch(dispatch).onUpdateReceiptProductPrice({
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
    firebaseService.updateAndDispatch(dispatch).onChangeReceiptProductQuantity({
      id_receipt,
      id_product,
      quantity,
    });
  };
  const onDeleteReceiptProduct = ({ id_receipt, id_product }) => {
    firebaseService.updateAndDispatch(dispatch).onChangeReceiptProductQuantity({
      id_receipt,
      id_product,
      quantity: 0,
    });
  };
  const onOpenAddProductsModal = ({id_store, id_receipt}) => {
    setModalStoreAndReceiptId({id_store, id_receipt});
  }
  const assignStoreProductsToReceipt = (selectedInstances) => {
    if(Object.keys(selectedInstances).length > 0) {
      const {
        id_store,
        id_receipt
      } = modalStoreAndReceiptId;
      const update_quantity_paths = {};
      const receiptProductsArr = Object.entries(receipts[id_receipt].products || {}).map(([id_product, product]) => ({id_product, ...product}));
    
      const storeProducts = stores[id_store].products;
      const selectedProducts = [];
      Object.entries(selectedInstances).forEach(([referenceId, quantity]) => {
        const existingReceiptProduct = receiptProductsArr.find(product => (product.referenceId === referenceId));
        if(existingReceiptProduct) {
          update_quantity_paths[`${existingReceiptProduct.id_product}/quantity`] = quantity + (existingReceiptProduct.quantity || 0);
        }else{
          selectedProducts.push({
            ...storeProducts[referenceId],
            referenceId,
            quantity: quantity
          })
        }
      })
      firebaseService.updateAndDispatch(dispatch).onSubmitProductsToReceipt({id_receipt, selectedProducts, update_quantity_paths});
    }
    setModalStoreAndReceiptId({id_store: undefined, id_receipt: undefined});
  }
  return (
    <>
    <AddProductsModal
        isModalVisible={modalStoreAndReceiptId.id_store !== undefined}
        products={!modalStoreAndReceiptId.id_store ? [] : Object.entries(stores[modalStoreAndReceiptId.id_store].products || {}).map(([store_id_product, product]) => ({
          ...product,
          store_id_product,
          tvaPercent: tvas[product.tva],
        }))}
        id_store={modalStoreAndReceiptId.id_store}
        submitProducts={(selectedInstances) => assignStoreProductsToReceipt(selectedInstances)}
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
                  onPress={() => onOpenAddProductsModal({id_store: storeId, id_receipt})}
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
