import React from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import style from "./AuthStyle";
import { actions } from "../../../store/reducers/authReducer";
import * as Builder from "../../../store/reducers/builderReducer";
import { useSelector, useDispatch } from "react-redux";
import { onSignUp, onSignIn } from "./authHelpers";

import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";

function Auth() {
  const dispatch = useDispatch();
  const { languagePackEn } = useSelector(({ builder }) => ({
    languagePackEn: Builder.selectors.getLanguage(builder, "default", [
      "email",
      "password",
      "register"
    ])
  }));
  const [showRegisterForm, setShowRegisterForm] = React.useState(true);
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: ""
  });
  const [registerFormData, setRegisterFormData] = React.useState({
    email: "gabidiac11@gmail.com",
    password: "12345",
    confirmPassword: "12345"
  });
  const [errorMessage, setErrorMessage] = React.useState();
  const [successMessage, setSuccessMessage] = React.useState();
  const [isFetching, setIsFetching] = React.useState();
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function toggleAuthOptions() {
    setShowRegisterForm(!showRegisterForm);
  }
  function tryLoginIn() {
    const { email, password } = loginFormData;
    const valid_email = validateEmail(email);
    const valid_password = password !== "";
    if (valid_email && valid_password) {
      setIsFetching(true);
      onSignIn(email, password).then(
        ({ token, uid }) => {
          setIsFetching(false);
          dispatch(actions.login({ email, token, uid }));
        },
        (err) => {
          setIsFetching(false);
        }
      );
    } else {
      if (valid_email) {
        setErrorMessage("Something wrong with the email address");
      } else {
        setErrorMessage("Something wrong with the password");
      }
    }
  }
  function tryRegister() {
    const { email, password, confirmPassword } = registerFormData;
    const valid_email = validateEmail(email);
    const valid_password = password !== "";
    const valid_confirm_password = password === confirmPassword;
    if (valid_email && valid_password && valid_confirm_password) {
      setIsFetching(true);
      onSignUp(email, password).then(
        function(resp) {
          setIsFetching(false);
          setSuccessMessage("User created.");
        },
        function(err) {
          setIsFetching(false);
          setErrorMessage(err.message || "Internal error while trying.");
        }
      );
    } else {
      if (!valid_email) {
        setErrorMessage("Something wrong with the email address");
      } else if (!valid_password) {
        setErrorMessage("Something wrong with the password");
      } else {
        setErrorMessage("Passwords don't match");
      }
    }
  }
  function toggleRegisterForm() {
    setShowRegisterForm(true);
  }
  return (
    <View style={style.container}>
      {showRegisterForm ? (
        <View style={style.subContainer}>
          <Input
            placeholder="email"
            textContentType="emailAddress"
            leftIcon={<Icon name="envelope-square" size={24} color="black" />}
            onChangeText={text => {
              setRegisterFormData({ ...registerFormData, email: text });
            }}
            value={registerFormData.email}
          />
          <Input
            textContentType="password"
            placeholder="password"
            leftIcon={<Icon name="key" size={24} color="black" />}
            onChangeText={text => {
              setRegisterFormData({ ...registerFormData, password: text });
            }}
            value={registerFormData.password}
          />
          <Input
            textContentType="newPassword"
            placeholder="confirm password"
            leftIcon={<Icon name="key" size={24} color="black" />}
            onChangeText={text => {
              setRegisterFormData({
                ...registerFormData,
                confirmPassword: text
              });
            }}
            value={registerFormData.confirmPassword}
          />
          <Button
            containerStyle={{ ...style.margin_bottom }}
            icon={<Icon name="arrow-right" size={15} color="white" />}
            title={"Sign up"}
            onPress={tryRegister}
          />
        </View>
      ) : (
        <View style={style.subContainer}>
          <Input
            placeholder="email"
            textContentType="emailAddress"
            leftIcon={<Icon name="envelope-square" size={24} color="black" />}
            onChangeText={text => {
              setLoginFormData({ ...loginFormData, email: text });
            }}
            value={loginFormData.email}
          />
          <Input
            textContentType="newPassword"
            placeholder="password"
            leftIcon={<Icon name="key" size={24} color="black" />}
            onChangeText={text => {
              setLoginFormData({ ...loginFormData, password: text });
            }}
            value={loginFormData.password}
          />
          <Button
            containerStyle={{ ...style.margin_bottom }}
            icon={<Icon name="arrow-right" size={15} color="white" />}
            title={"Sign in"}
            onPress={tryLoginIn}
          />
        </View>
      )}
      <Button
        containerStyle={{ ...style.margin_bottom }}
        icon={<Icon name="toggle-on" size={15} color="white" />}
        title={showRegisterForm ? "Login" : "Register"}
        onPress={toggleAuthOptions}
      />
      {errorMessage && <Text> {errorMessage} </Text>}
      {successMessage && <Text> {successMessage} </Text>}
      {isFetching && <Text style={style.loader}> Loading </Text>}
    </View>
  );
}
export default Auth;
