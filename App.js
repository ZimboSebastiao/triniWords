import * as Sentry from "@sentry/react-native";
import { Slot, useNavigationContainerRef } from "expo-router";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import useLoadFonts from "./src/utils/useLoadFonts";
import TabNavigator from "./src/navigation/TabNavigator";
import { SearchHistoryProvider } from "./src/context/SearchHistoryContext";
import Splash from "./src/screens/Splash";

Sentry.init({
  dsn: "https://1293a6dd809605d94b56b5859c9f63cb@o4508274834735104.ingest.de.sentry.io/4508274841485392",
  // debug: true, // Opcional para modo de desenvolvimento. Defina como false em produção.
});

function MainApp() {
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

export default Sentry.wrap(MainApp);
