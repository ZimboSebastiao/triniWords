import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useLoadFonts from "./src/utils/useLoadFonts";
import TabNavigator from "./src/navigation/TabNavigator";
import { SearchHistoryProvider } from "./src/context/SearchHistoryContext";
import Splash from "./src/screens/Splash";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const fontsLoaded = useLoadFonts();

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(splashTimer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SearchHistoryProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SearchHistoryProvider>
  );
}
