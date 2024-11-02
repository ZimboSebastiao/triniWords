import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.saudacao}>
        <Text>Hi There 👋</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFF0",
  },
  saudacao: {
    backgroundColor: "red",
    marginVertical: 60,
    alignItems: "center",
  },
});
