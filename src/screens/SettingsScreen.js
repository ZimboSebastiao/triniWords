import { View, Text, Pressable, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
  const [searchHistory, setSearchHistory] = useState([]);

  // Função para adicionar uma palavra ao histórico de pesquisas
  const addSearchTerm = async (term) => {
    try {
      const updatedHistory = [...searchHistory, term];
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error("Erro ao armazenar no AsyncStorage:", error);
    }
  };

  // Função para navegar até a SearchScreen com a palavra pesquisada
  const handleSearch = (term) => {
    navigation.navigate("SearchScreen", { searchTerm: term });
  };

  // Função para carregar o histórico de pesquisas do AsyncStorage
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

  // Carregar o histórico ao montar o componente
  useEffect(() => {
    loadSearchHistory();
  }, []);

  // Adicione algumas palavras de exemplo ao histórico ao inicializar
  useEffect(() => {
    const exampleTerms = ["React Native", "JavaScript", "Expo"];
    exampleTerms.forEach((term) => addSearchTerm(term));
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
