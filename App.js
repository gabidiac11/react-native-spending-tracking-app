import React from "react";
import { store, persistor } from "./app/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Routes from "./app/Routes";
import * as firebase from "firebase";
import LoadingView from "./app/components/LayoutSplashScreen";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDje_cSCG6UABvJEAp_oj68D3O6FrNeQ5Y",
  authDomain: "spending-tracking-native.firebaseapp.com",
  databaseURL: "https://spending-tracking-native.firebaseio.com",
  projectId: "spending-tracking-native",
  storageBucket: "spending-tracking-native.appspot.com",
  messagingSenderId: "829705608622",
  appId: "1:829705608622:web:0c85b7921a1609a4193c3f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
