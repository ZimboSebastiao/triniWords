import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from 'expo-video';
import { navigate } from "../utils/RootNavigation";

export default function Splash() {
  // Usando o hook useVideoPlayer para controlar o player de vídeo
  const videoSource = require('../../assets/videos/splash.mp4');
  const player = useVideoPlayer(videoSource, player => {
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
    <View style={styles.container}>
      {/* Usando o VideoView para renderizar o vídeo */}
      <VideoView style={styles.video} player={player} />
    </View>
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
  },
});
