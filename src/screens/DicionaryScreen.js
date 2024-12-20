import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DicionaryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [learnedWords, setLearnedWords] = useState([]);

  const saveWord = async (newWord) => {
    try {
      const existingWords = await AsyncStorage.getItem("learnedWords");
      const wordsArray = existingWords ? JSON.parse(existingWords) : [];

      if (!wordsArray.includes(newWord)) {
        wordsArray.push(newWord);

        await AsyncStorage.setItem("learnedWords", JSON.stringify(wordsArray));

        setLearnedWords(wordsArray);

        console.log("Palavra salva:", newWord);
      } else {
        console.log("Palavra já salva:", newWord);
      }
    } catch (error) {
      console.error("Erro ao salvar palavra:", error);
    }
  };

  const handleSearch = (term) => {
    saveWord(term);
    navigation.navigate("SearchScreen", { word: term });
  };

  useEffect(() => {
    const loadLearnedWords = async () => {
      const existingWords = await AsyncStorage.getItem("learnedWords");
      console.log("Carregando palavras:", existingWords);
      if (existingWords) {
        const wordsArray = JSON.parse(existingWords);
        console.log("Palavras carregadas:", wordsArray);
        setLearnedWords(wordsArray);
      }
    };
    loadLearnedWords();
  }, []);

  const clearLearnedWords = async () => {
    try {
      await AsyncStorage.removeItem("learnedWords");
      setLearnedWords([]);
      console.log("Palavras removidas com sucesso!");
    } catch (error) {
      console.error("Erro ao remover palavras:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewIcons}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons
            name="arrow-left-thin"
            color="#38b6ff"
            size={35}
          />
        </Pressable>
        <Text style={styles.title}>Vocabulary</Text>
        <MaterialCommunityIcons name="arm-flex" color="#38b6ff" size={35} />
      </View>

      <View style={styles.search}>
        <Searchbar
          placeholder="Looking for..."
          placeholderTextColor="#b1b4b5"
          iconColor="#38b6ff"
          clearIcon="close"
          clearIconColor="#38b6ff"
          style={styles.searchbar}
          inputStyle={styles.input}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
      </View>
      <View style={styles.viewBroom}>
        <Text style={styles.title}>All Words</Text>
        <Pressable onPress={clearLearnedWords} style={styles.clearButton}>
          <MaterialCommunityIcons name="broom" color="#f50f39" size={35} />
        </Pressable>
      </View>
      {learnedWords.length === 0 ? (
        <View
          style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.noHistoryText}>No words have been added yet</Text>
          <Image
            style={styles.noWord}
            source={require("../../assets/images/question.png")}
          />
        </View>
      ) : (
        <FlatList
          data={learnedWords}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                {
                  padding: 10,
                  backgroundColor: pressed ? "#38b6ff" : "#ededed",
                  marginVertical: 5,
                  borderRadius: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                  margin: 3,
                },
              ]}
            >
              <Text style={styles.wordText}>{item}</Text>
            </Pressable>
          )}
          contentContainerStyle={styles.viewAll}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#ededed",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ededed",
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  wordText: {
    fontSize: 18,
  },
  noHistoryText: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
    color: "#777",
  },
  noWord: {
    width: 290,
    height: 290,
  },
  viewBroom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 9,
  },
});
