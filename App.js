import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import useLoadFonts from "./src/utils/useLoadFonts";
import TabNavigator from "./src/navigation/TabNavigator";
import { SearchHistoryProvider } from "./src/context/SearchHistoryContext";
import { navigationRef } from "./src/utils/RootNavigation";
import Splash from "./src/screens/Splash";
import { scheduleDailyNotification } from "./src/utils/notifications";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const fontsLoaded = useLoadFonts();

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    scheduleDailyNotification(); // Agende a notificação ao iniciar o app
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SearchHistoryProvider>
      <NavigationContainer ref={navigationRef}>
        <TabNavigator />
      </NavigationContainer>
    </SearchHistoryProvider>
  );
}
