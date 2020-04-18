import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "app/store/reducers/builderReducer";

import LogoutButtonComponent from "app/components/pages/Auth/LogoutButtonComponent";
import style from "./HeaderStyle";
export default function Header(props) { 
  const dispatch = useDispatch();
  const { incQ } = useSelector(({ builder: { incQ } }) => ({
    incQ,
  }));
  return (
    <View style={style.headerContainer}>
      <LogoutButtonComponent />
      <View>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ ...style.generic_text, ...style.incQText }}>
            {incQ}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
