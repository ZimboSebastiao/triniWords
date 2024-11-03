import React, { useEffect } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { useSearchHistory } from "../context/SearchHistoryContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  const { searchHistory, addSearchTerm } = useSearchHistory();

  const handleSearch = (term) => {
    navigation.navigate("SearchScreen", { word: term });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EDEFF0",
        padding: 20,
        paddingTop: 50,
      }}
    >
      <View style={styles.viewIcons}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons
            name="arrow-left-thin"
            color="#3BB3BD"
            size={35}
          />
        </Pressable>
        <Text style={styles.title}>Historic</Text>
        <MaterialCommunityIcons name="arm-flex" color="#3BB3BD" size={35} />
      </View>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 20,
          marginTop: 50,
          fontWeight: "bold",
        }}
      >
        Search History
      </Text>
      <FlatList
        data={searchHistory}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSearch(item)}
            style={({ pressed }) => [
              {
                padding: 10,
                backgroundColor: pressed ? "#3BB3BD" : "#fff",
                marginVertical: 5,
                borderRadius: 8,
              },
            ]}
          >
            <Text style={{ fontSize: 18 }}>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 35,
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
});
