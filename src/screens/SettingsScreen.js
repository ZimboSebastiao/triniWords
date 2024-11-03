import { View, Text, Pressable, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
  const [searchHistory, setSearchHistory] = useState([]);

  const addSearchTerm = async (term) => {
    try {
      const updatedHistory = [...new Set([...searchHistory, term])]; // Evita duplicatas
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error("Erro ao armazenar no AsyncStorage:", error);
    }
  };

  const handleSearch = (term) => {
    navigation.navigate("SearchScreen", { word: term, addSearchTerm }); // Passa a função também
  };

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("searchHistory");
      if (history !== null) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error("Erro ao carregar do AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadSearchHistory();
  }, []);

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
