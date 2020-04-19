import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { actions as builderActions } from "app/store/reducers/builderReducer";
import { actions as authActions } from "app/store/reducers/authReducer";

import style from "./HeaderStyle";
import Button from "../../../../reusableComponents/Button/Button";

export function HeaderLeft(props) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Button
      containerStyle={style.logoutBtnContainer}
      textStyle={{lineHeight: 20}}
      content={"Log out "}
      onPress={logout}
      rightIcon={{ name: "sign-out", size: 20 }}
    />
  );
}

export function HeaderRight(props) {
  const dispatch = useDispatch();
  const { incQ } = useSelector(({ builder: { incQ } }) => ({
    incQ,
  }));
  const switchIncQ = () => {
    dispatch(builderActions.setIncQ({ incQ: incQ === 1 ? 0.1 : 1 }));
  };
  return (
    <Button
      onPress={switchIncQ}
      containerStyle={style.incQContainer}
      nodeContent={
        <>
          <View style={style.plusMinusCont}>
            <Text style={style.plusMinusText}>+</Text>
            <Text style={style.plusMinusText}>-</Text>
          </View>
          <Text style={style.incQText}>{{'0.1': '.1', '1': 1}[incQ]}</Text>
        </>
      }
    />
  );
}
