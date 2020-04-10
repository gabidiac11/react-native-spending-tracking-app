import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";

import { actions } from "../../../store/reducers/authReducer";

export default function LogoutButton() {
  const dispatch = useDispatch();
  function logout() {
    dispatch(actions.logout());
  }
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
