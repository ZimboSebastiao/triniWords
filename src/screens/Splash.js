import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { navigate } from "../utils/RootNavigation"; // Importe a função navigate

export default function Splash() {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("Home"); // Use a navegação programática
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/videos/splash.mp4")}
        shouldPlay
        isLooping
        resizeMode="contain"
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    flex: 1,
    width: "45%",
    height: "45%",
  },
});
