import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./components/pages/Home/Home";
import Auth from "./components/pages/Auth/Auth";

import LogoutButton from "./components/pages/Auth/LogoutButtonComponent";

const Stack = createStackNavigator();

export function Routes() {
  const { isAuth, languagePackEn,isLoggingOut } = useSelector(
    ({
      auth: { user, isLoggingOut },
      builder: {
        statics: { languagePack }
      }
    }) => ({
      isLoggingOut,
      isAuth: user != null,
      languagePackEn: languagePack["en"]
    })
  );
  const { log_in_header } = languagePackEn;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuth ? (
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{
              compone3: log_in_header,
              animationTypeForReplace: isLoggingOut ? "pop" : "push"
            }}
          />
        ) : (
          <Stack.Screen name="Home" 
          options={{
            headerTitle: ()=>(<LogoutButton/>)
          }}
          component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
