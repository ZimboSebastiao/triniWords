import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DicionaryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate("SearchScreen", { word: searchQuery.trim() });
    }
  };

  useEffect(() => {
    const loadLearnedWords = async () => {
      const existingWords = await AsyncStorage.getItem("learnedWords");
      if (existingWords) {
        const wordsArray = JSON.parse(existingWords);
        console.log(wordsArray);
      }
    };

    loadLearnedWords();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewIcons}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons
            name="arrow-left-thin"
            color="#3BB3BD"
            size={35}
          />
        </Pressable>
        <Text style={styles.title}>Dictionary</Text>
        <MaterialCommunityIcons name="arm-flex" color="#3BB3BD" size={35} />
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
          onSubmitEditing={handleSearch}
        />
      </View>
      <Text style={styles.title}>All Words</Text>
      <View style={styles.viewAll}></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFF0",
    padding: 20,
    paddingTop: 50,
  },
  viewIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
    color: "#30333C",
  },
  search: {
    padding: 2,
    marginVertical: 28,
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
  viewAll: {
    backgroundColor: "red",
  },
});
