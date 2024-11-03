import React, { useEffect } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { useSearchHistory } from "../context/SearchHistoryContext";

export default function SettingsScreen({ navigation }) {
  const { searchHistory, addSearchTerm } = useSearchHistory();

  const handleSearch = (term) => {
    navigation.navigate("SearchScreen", { word: term });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>SettingsScreen</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Histórico de Pesquisas:
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
                backgroundColor: pressed ? "#ddd" : "#fff",
                marginVertical: 5,
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
