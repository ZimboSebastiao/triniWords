import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Home");
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/videos/splash.mov")}
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
