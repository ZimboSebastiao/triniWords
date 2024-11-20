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
import { Audio } from "expo-av";
import { useSearchHistory } from "../context/SearchHistoryContext";
import * as Speech from "expo-speech";
import { Image } from "react-native";

import { translateWord } from "../utils/translate";

export default function SearchScreen({ route }) {
  const { word } = route.params;
  const { addSearchTerm } = useSearchHistory();

  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState(null);
  const [translation, setTranslation] = useState(null);

  useEffect(() => {
    console.log("Parâmetros recebidos:", { word });

    const getDefinition = async () => {
      if (word) {
        addSearchTerm(word);
        console.log("Palavra adicionada ao histórico:", word);
      }

      try {
        setLoading(true);
        setError(null);
        setDefinition(null);

        const data = await fetchWordDefinition(word);

        if (Array.isArray(data) && data.length > 0) {
          setDefinition(data[0]);
        } else {
          setError("Sorry, the word was not found!");
        }
      } catch (error) {
        setError("Sorry, the word was not found!");
      } finally {
        setLoading(false);
      }
    };

    const getTranslation = async () => {
      const translated = await translateWord(word); // Chamando a função de tradução
      setTranslation(translated); // Armazenando a tradução
    };

    getDefinition();
    getTranslation();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [word]);

  const playAudio = async () => {
    if (definition && definition.phonetics) {
      const audioUrl = definition.phonetics.find((p) => p.audio)?.audio;
      if (audioUrl) {
        try {
          const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
          setSound(sound);
          await sound.playAsync();
        } catch (error) {
          console.error("Erro ao reproduzir o áudio:", error);
        }
      } else {
        if (definition.word) {
          Speech.speak(definition.word, {
            language: "en",
          });
        }
      }
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#38b6ff" />;
  if (error)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.errorText}>{error}</Text>
        <Image
          style={styles.notfound}
          source={require("../../assets/images/no-data.gif")}
        />
      </View>
    );

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
          <View style={styles.translate}>
            {translation && (
              <View style={styles.translationContainer}>
                <Text style={styles.translationText}>
                  Tradução: {translation}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.viewPhonetic}>
            <Text style={styles.phonetic}>{definition.phonetic || ""}</Text>
            <Pressable onPress={playAudio}>
              <MaterialCommunityIcons
                name="volume-high"
                color="#38b6ff"
                size={30}
                style={{ padding: 5 }}
              />
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
    flex: 1,
    padding: 35,
    backgroundColor: "#fff",
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
    color: "#38b6ff",
    marginTop: 5,
  },
  errorText: {
    fontSize: 20,
    color: "#e62023",
    textAlign: "center",
  },
  viewTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewPhonetic: {
    flexDirection: "row",
    alignItems: "center",
  },
  notfound: {
    width: 290,
    height: 290,
  },
  translationContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: "100%",
  },
  translationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38b6ff",
  },
  translate: {
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "flex-start",
  },
});
