import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DicionaryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <MaterialCommunityIcons
          name="arrow-left-thin"
          color="#3BB3BD"
          size={35}
        />
        <MaterialCommunityIcons
          name="arrow-left-thin"
          color="#3BB3BD"
          size={35}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFF0",
    // justifyContent: "center",
    padding: 35,
  },
});
