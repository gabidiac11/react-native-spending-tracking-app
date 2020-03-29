import React from "react";
import ReceiptPage from "./ReceiptPage/ReceiptPage";
import StatsPage from "./StatsPage/StatsPage";
import StoresPage from "./StoresPage/StoresPage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Receipts" component={ReceiptPage} />
      <Tab.Screen name="Stats" component={StatsPage} />
      <Tab.Screen name="Stores" component={StoresPage} />
    </Tab.Navigator>
  );
}