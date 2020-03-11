import React from "react";
import { ListView, View, Text } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LayoutSplashScreen from "./app/LayoutSplashScreen";
export default function SpendingApp() {
  return (
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          <ListView>
            <Text>something</Text>
          </ListView>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
