import React from "react";
import { store, persistor } from "./app/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Routes from "./app/Routes";
import {FirebaseServiceContext, firebaseInstance} from "./app/components/firebaseService";
import LoadingView from "./app/components/LayoutSplashScreen";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
          <Routes />
      </PersistGate>
    </Provider>
  );
}
