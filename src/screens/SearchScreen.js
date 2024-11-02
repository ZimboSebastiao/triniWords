import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { fetchWordDefinition } from "../apis/dictionaryApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SearchScreen({ route }) {
  // const { word } = route.params;
  const word = route.params?.word || "";
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDefinition = async () => {
      try {
        setLoading(true);
        const data = await fetchWordDefinition(word);

        if (Array.isArray(data) && data.length > 0) {
          setDefinition(data[0]);
        } else {
          setError("Definição não encontrada");
        }
      } catch (error) {
        setError("Erro ao buscar definição da palavra");
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
      {definition && (
        <>
          <View style={styles.viewTitle}>
            <Text style={styles.wordTitle}>
              {definition.word || "Palavra não encontrada"}
            </Text>
            <MaterialCommunityIcons
              name="book-open-variant"
              color="#b1b4b5"
              size={35}
              style={{ padding: 30 }}
            />
          </View>
          <View>
            <Text style={styles.phonetic}>{definition.phonetic || ""}</Text>
            <Pressable>
              <MaterialCommunityIcons name="home" color="#3BB3BD" size={35} />
            </Pressable>
          </View>
          <Text style={styles.origin}>{definition.origin || ""}</Text>

          {definition.meanings &&
            definition.meanings.map((meaning, index) => (
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
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 35,
    marginVertical: 70,
  },
  wordTitle: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#30333C",
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
  viewTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
