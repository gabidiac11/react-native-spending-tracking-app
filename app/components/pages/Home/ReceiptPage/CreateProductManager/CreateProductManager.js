// @flow
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "react-native-elements";
import Button from "./../.././../../../reusableComponents/Button/Button";

import style from "./createProductManagerStyle";
import FirebaseService from "../../../../firebaseService";
import { View, Text, Picker } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Value } from "react-native-reanimated";
import { generateFloatNumberAndTextNumber } from "../../../../../helpers/helperFunctions";

export function CreateProductManager({ id_store }) {
  const dispatch = useDispatch();
  const { existingNames, tvasArr, productCategory } = useSelector(
    ({
      builder: {
        app_data: { stores, tvas },
      },
    }) => ({
      existingNames: Object.entries(stores.products || {})
        .map(([referenceId, { name }]) => name)
        .reduce((names, name) => ({ ...names, name }), {}),
      tvasArr: Object.entries(tvas).map(([type, percent]) => ({
        type,
        percent,
      })),
    })
  );

  const [product, setProduct] = React.useState({
    name: "nume test",
    price: "5",
    utility: true,
  });
  const [priceText, setPriceText] = React.useState();
  const [isFetching, setIsFetching] = React.useState({});
  
  const productReadyToSubmit = (typeof product.name === "string" 
    && product.name.length > 0 
  ) && 
  (
    typeof product.price === "number" && product.price > 0
  );

  //   const FirebaseService = new FirebaseService();
  React.useEffect(() => {
    setProduct({});
  }, [id_store]);

  function setName(text) {
    setProduct({ ...product, name: text });
  }
  function setPrice(text) {
    const {
      textNumber,
      floatNumber
    } = generateFloatNumberAndTextNumber(text);
    setProduct({ ...product, price: floatNumber });
    setPriceText(textNumber);
  }
  function toggleUtility() {
    setProduct({ ...product, utility: !product.utility });
  }
  function submitProduct() {
    setIsFetching(true);
    FirebaseService.updateAndDispatch(dispatch).
    setIsFetching(false);
  }
  function setTva(tva) {
    setProduct({...product, tva})
  }
  return (
    <View style={style.container}>
      <Input
        containerStyle={style.name}
        inputStyle={style.name_input}
        placeholder="name"
        textContentType="text"
        onChangeText={setName}
        value={product.name || ""}
      />
      <View style={style.inputsFlexContainer}>
        <Input
          containerStyle={style.price}
          inputStyle={style.price_input}
          placeholder="price"
          textContentType="telephoneNumber"
          onChangeText={setPrice}
          value={ priceText !== undefined ? priceText : String(product.price || "0")}
        />
        <Picker
          style={style.tva}
          selectedValue="tva"
          mode="dialog"
          onValueChange={(tvaType) => setTva(tvaType)}
        >
          {tvasArr.map(({ type, percent }) => (
            <Picker.Item label={`Tva ${type} - ${percent}%`} value={type} />
          ))}
        </Picker>
      </View>

      <View style={style.bottom_container}>
        <View style={style.left_container}>
          <View style={style.utility}>
            <TouchableOpacity
              onPress={() => toggleUtility()}
              style={style.utility_first_child}
            >
              <Text style={style.utility_text}>Is this neccessary to you?</Text>
              <Icon
                name={product.utility ? "thumbs-up" : "thumbs-down"}
                size={24}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.right_container}>
          <Button
            onPress={submitProduct}
            leftIcon={{ name: "arrow-right" }}
            containerStyle={{...style.submit_button(productReadyToSubmit)}}
          />
        </View>
      </View>
    </View>
  );
}
