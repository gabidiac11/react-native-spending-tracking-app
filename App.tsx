import React from 'react';
import { ListView, View, Text } from 'react-native';
import SpendingApp from "./SpendingApp";
import store, { persistor } from "./app/store/store";

export default function App() {
  return (
    <SpendingApp 
    store={store}
    persistor={persistor}/>
    // <ReceiptList/>
  );
}
