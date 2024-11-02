// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import useLoadFonts from "./src/utils/useLoadFonts";
import TabNavigator from "./src/navigation/TabNavigator";

export default function App() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
