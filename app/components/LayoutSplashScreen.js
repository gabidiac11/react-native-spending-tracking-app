import React from "react";
import { View, Text } from "react-native";
export default function SpendingApp({text = "Loading....."}) {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}
