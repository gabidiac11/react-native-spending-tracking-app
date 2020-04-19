import React from "react";
import { Text, TouchableOpacity } from "react-native";
import style from "./buttonStyle";
import Icon from "react-native-vector-icons/FontAwesome";

function Button({onPress, containerStyle, textStyle, content = "", leftIcon, rightIcon, nodeContent }) {
    return (
      <TouchableOpacity
        style={{...style.container, ...(containerStyle || {})}}
        onPress={() => {
          onPress();
        }}
      >
        {nodeContent ? nodeContent : <Text> </Text>}
        <Text
          style={{...style.text, ...(textStyle || {})}}
        >
          {leftIcon && <Icon name={leftIcon.name} size={leftIcon.size || 24} color={leftIcon.color || "white"} />}
          {content}
          {rightIcon && <Icon name={rightIcon.name} size={rightIcon.size || 24} color={rightIcon.color || "white"} />}
        </Text>
      </TouchableOpacity>
    );
}

export default Button;
