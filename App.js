import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useLoadFonts from "./src/utils/useLoadFonts";
import TabNavigator from "./src/navigation/TabNavigator";
import { SearchHistoryProvider } from "./src/context/SearchHistoryContext";
import Splash from "./src/screens/Splash"; // Importe o componente Splash

export default function App() {
  const [showSplash, setShowSplash] = useState(true); // Estado para controlar a exibição do splash
  const fontsLoaded = useLoadFonts();

  useEffect(() => {
    // Temporizador para ocultar o splash após um período definido
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // Tempo desejado para o splash (3 segundos, por exemplo)

    return () => clearTimeout(splashTimer);
  }, []);

  // Se o splash ainda deve ser exibido, renderize-o
  if (showSplash) {
    return <Splash />;
  }

  // Aguarda o carregamento das fontes antes de renderizar a navegação principal
  if (!fontsLoaded) {
    return null;
  }

  // Renderiza o aplicativo principal após o splash
  return (
    <SearchHistoryProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SearchHistoryProvider>
  );
}
