import React, { useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { navigate } from "../utils/RootNavigation";

export default function Splash() {
  const videoSource = require("../../assets/videos/splash.mp4");
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("Home");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => null}>
      <View style={styles.container}>
        <VideoView
          style={styles.video}
          player={player}
          nativeControls={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  video: {
    flex: 1,
    width: "45%",
    height: "45%",
    position: "absolute",
  },
});
