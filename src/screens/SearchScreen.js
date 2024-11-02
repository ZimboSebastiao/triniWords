// src/screens/SearchScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { fetchWordDefinition } from "../apis/dictionaryApi";

export default function SearchScreen({ route }) {
  const { word } = route.params;
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDefinition = async () => {
      try {
        setLoading(true);
        const data = await fetchWordDefinition(word);
        setDefinition(data[0]); // Pega a primeira definição retornada
      } catch (error) {
        setError("Definition not found");
      } finally {
        setLoading(false);
      }
    };
    getDefinition();
  }, [word]);

  if (loading) return <ActivityIndicator size="large" color="#3BB3BD" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.wordTitle}>{definition.word}</Text>
      <Text style={styles.phonetic}>{definition.phonetic}</Text>
      <Text style={styles.origin}>{definition.origin}</Text>

      {definition.meanings.map((meaning, index) => (
        <View key={index} style={styles.meaningContainer}>
          <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
          {meaning.definitions.map((def, i) => (
            <View key={i} style={styles.definitionContainer}>
              <Text style={styles.definition}>{def.definition}</Text>
              {def.example && (
                <Text style={styles.example}>Example: {def.example}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  wordTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3BB3BD",
  },
  phonetic: {
    fontSize: 18,
    color: "#666",
    marginVertical: 5,
  },
  origin: {
    fontSize: 16,
    fontStyle: "italic",
    marginVertical: 5,
  },
  meaningContainer: {
    marginTop: 15,
  },
  partOfSpeech: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#30333C",
  },
  definitionContainer: {
    marginTop: 10,
  },
  definition: {
    fontSize: 16,
  },
  example: {
    fontSize: 16,
    color: "#3BB3BD",
    marginTop: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
