import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";

import Button from "./../../../../../reusableComponents/Button/Button";
import { reduceNumberMatisse } from "../../../../../helpers/helperFunctions";

import style, { constants } from "./addProductsModalStyle";
import { TouchableOpacity } from "react-native";
import { CreateProductManager } from "../CreateProductManager/CreateProductManager";
 
export default AddProductModal = ({
  id_store,
  products,
  isModalVisible,
  submitProducts,
}) => {
  const [selectedInstances, setSelectedInstances] = React.useState({});
  const [submitButton, setSubmitButton] = React.useState({});
  const [showProductForm, setShowProductForm] = React.useState(true);

  React.useEffect(() => {
    setSelectedInstances({});
  }, [id_store]);
  React.useEffect(() => {
      const numOfSelectedInstances = Object.keys(selectedInstances).length;
    setSubmitButton(
        numOfSelectedInstances > 0 ?
        {
        content: `Add [${Object.entries(selectedInstances).reduce((sum, [refId, quantity]) => (sum + quantity), 0)}]`
        
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
  function toggleProductForm(){
    setShowProductForm(!showProductForm)
  }
  function onSubmitProducts(){
    submitProducts(Object.assign({}, selectedInstances));
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
                
                <View style={style.bottom_container} 
                    
                >
                  <TouchableOpacity style={style.left_container} onPress={() => setNumberOfProductInstance(store_id_product, 1)}>
                    <Text style={style.product_name}>
                        <Icon name={utility ? "thumbs-up" : "thumbs-down"} size={15} color={"black"} /> {name}
                    </Text>
                    <Text style={style.price}>{`${price} RON`}</Text>
                    <Text
                      style={style.tva}
                    >{`TVA - ${tva} - ${tvaPercent}% - ${reduceNumberMatisse(
                      (tvaPercent / 100) * price
                    )}`}</Text>
                  </TouchableOpacity>
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
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.store_id_product}
        />
        {showProductForm && <CreateProductManager key={id_store} id_store={id_store}/>}
        <View style={style.action_buttons_container}>
        <Button
          containerStyle={{
            ...style.submit_button,
            ...(Object.keys(selectedInstances).length > 0 ? 
              style.add_btn_ : style.go_back_btn_
            )
          }}
          textStyle={style.submit_button_text}
          leftIcon={submitButton.icon}
          content={submitButton.content}
          onPress={onSubmitProducts}
        />
         <Button
          containerStyle={style.show_product_form}
          textStyle={style.sub}
          rightIcon={{name: showProductForm ? 'angle-down' : 'angle-up'} }
          content={"Create new product "}
          onPress={toggleProductForm}
        />
        </View>
        
      </View>
    </Modal>
  );
};
