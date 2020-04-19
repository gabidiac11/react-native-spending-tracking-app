import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";

import Button from "./../../../../../reusableComponents/Button/Button";
import { reduceNumberMatisse } from "../../../../../helpers/helperFunctions";

import style, { constants } from "./addProductsModalStyle";
import { TouchableOpacity } from "react-native-gesture-handler";

export default AddProductModal = ({
  id_store,
  products,
  isModalVisible,
  onSelectProduct,
}) => {
  const [selectedInstances, setSelectedInstances] = React.useState({});
  const [submitButton, setSubmitButton] = React.useState({});
  
  React.useEffect(() => {
    setSelectedInstances({});
  }, [id_store]);
  React.useEffect(() => {
      const numOfSelectedInstances = Object.keys(selectedInstances).length;
    setSubmitButton(
        numOfSelectedInstances > 0 ?
        {
        content: `${` Add selected products [${numOfSelectedInstances} ITEMS]`}`,
        icon: { name: "plus-circle", size: 20 },
        
      }
    : {
        content: "Go back",
      });
  }, [selectedInstances]);

  function setNumberOfProductInstance(store_id_product, incQ){
      if(selectedInstances[store_id_product]){
          const quantity = selectedInstances[store_id_product] + incQ;
          if(quantity <= 0){
              setSelectedInstances({..._.omit(selectedInstances, [store_id_product])});
          }else{
              setSelectedInstances({
                  ...selectedInstances,
                  [store_id_product]: quantity
              })
          }
      }else{
          if(incQ > 0){
            setSelectedInstances({
                ...selectedInstances,
                [store_id_product]: 1
            })
          }
      }
  }
  return (
    <Modal isVisible={isModalVisible} style={style.modal}>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ ...style.listContainer }}
          data={products}
          renderItem={({
            item: { name, price, store_id_product, tva, tvaPercent, utility },
          }) => {
            const numOfInstances = selectedInstances[store_id_product] ? selectedInstances[store_id_product] : 0;
            return (
              <View style={style.productContainer}>
                
                <TouchableOpacity style={style.bottom_container} 
                    onPress={() => setNumberOfProductInstance(store_id_product, 1)}
                >
                  <View style={style.left_container}>
                    <Text style={style.product_name}>
                        <Icon name={utility ? "thumbs-up" : "thumbs-down"} size={15} color={"black"} /> {name}
                    </Text>
                    <Text style={style.price}>{`${price} RON`}</Text>
                    <Text
                      style={style.tva}
                    >{`TVA - ${tva} - ${tvaPercent}% - ${reduceNumberMatisse(
                      (tvaPercent / 100) * price
                    )}`}</Text>
                  </View>
                  <View style={style.right_container}>
                    <Button
                      onPress={numOfInstances > 0 ? () => setNumberOfProductInstance(store_id_product, -1) : () => {}}
                      containerStyle={{
                        ...style.substractButton,
                        ...(numOfInstances === 0 ? {backgroundColor: "transparent"} : {backgroundColor: 'grey'} )
                      }}
                      textStyle={style.textButton}
                      content={"-1"}
                    />
                    <Button
                      onPress={() => setNumberOfProductInstance(store_id_product, 1)}
                      containerStyle={{...style.addButton,
                        ...(numOfInstances === 0 ? style.textButtonInactive : {})
                    }}
                      textStyle={{...style.textButton,
                       
                      }}
                      leftIcon={numOfInstances > 0 ? null : {name: 'check', color: 'white'}}
                      content={numOfInstances > 0 ? `${numOfInstances}+` : ""}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.store_id_product}
        />
        <Button
          containerStyle={style.submit_button}
          textStyle={style.submit_button_text}
          leftIcon={submitButton.icon}
          content={submitButton.content}
          onPress={onSelectProduct}
        />
      </View>
    </Modal>
  );
};
