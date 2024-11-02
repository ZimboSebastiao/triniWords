import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar, Card } from "react-native-paper";

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <View style={styles.container}>
      <View style={styles.saudacao}>
        <Text style={styles.title}>Hi There 👋</Text>
        <Text style={styles.subtitle}>
          What would you like to train today? Search below.
        </Text>
      </View>
      <View style={styles.search}>
        <Searchbar
          placeholder="Looking for..."
          placeholderTextColor="#b1b4b5"
          iconColor="#3BB3BD"
          clearIcon="close"
          clearIconColor="#3BB3BD"
          style={styles.searchbar}
          inputStyle={styles.input}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <View style={styles.studying}>
        <Text style={styles.title}>STUDYING</Text>
        <Pressable style={styles.learn}>
          <Card style={{ width: 200, backgroundColor: "#3BB3BD" }}>
            <Card.Cover
              source={require("../../assets/images/learn.png")}
              style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            />
            <Card.Content>
              <Text variant="titleLarge">BEGIN</Text>
              <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
          </Card>
        </Pressable>
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
    marginVertical: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
    color: "#30333C",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#b1b4b5",
    width: "65%",
    textAlign: "center",
    fontWeight: "bold",
  },
  search: {
    padding: 25,
  },
  searchbar: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  studying: {
    // backgroundColor: "red",
    marginVertical: 20,
    padding: 25,
  },
  learn: {
    // backgroundColor: "yellow",
  },
});
