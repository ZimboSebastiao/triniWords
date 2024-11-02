import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import useLoadFonts from "./src/utils/useLoadFonts";
import TabNavigator from "./src/navigation/TabNavigator";

export default function App() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    // Não renderiza nada até as fontes serem carregadas
    return null;
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
