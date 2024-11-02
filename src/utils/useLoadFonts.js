import { useState, useEffect } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default function useLoadFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return fontsLoaded;
}
