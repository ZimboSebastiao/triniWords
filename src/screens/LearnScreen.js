import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchRandomWord } from "../apis/randomWordApi";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { fetchWordDefinition } from "../apis/dictionaryApi";
import { saveWord } from "../utils/wordStorage";
import { translateWord } from "../utils/translate";

export default function LearnScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState(null);
  const [definition, setDefinition] = useState(null);
  const [translatedWord, setTranslatedWord] = useState(null);

  const fetchRandomWordHandler = async () => {
    setLoading(true);
    setError(null);

    try {
      const randomWord = await fetchRandomWord();
      if (!randomWord) {
        setError("Erro ao buscar uma palavra aleatória.");
        setLoading(false);
        return;
      }

      const wordDefinition = await fetchWordDefinition(randomWord);

      if (wordDefinition?.error) {
        setError(wordDefinition.error);
        setLoading(false);
        return;
      }

      setDefinition(wordDefinition[0]);

      saveWord(wordDefinition[0].word);

      // Chama a função de tradução
      const translated = await translateWord(wordDefinition[0].word);
      setTranslatedWord(translated);
    } catch (error) {
      setError("Erro ao buscar a definição da palavra.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomWordHandler();

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  const playAudio = async () => {
    const audioUrl = definition?.phonetics?.find((p) => p.audio)?.audio;

    if (audioUrl) {
      try {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync({
          uri: audioUrl,
        });
        setSound(newSound);
        await newSound.playAsync();
      } catch (error) {
        Speech.speak(definition?.word || "Word not available", {
          language: "en",
        });
      }
    } else {
      Speech.speak(definition?.word || "Word not available", {
        language: "en",
      });
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#38b6ff" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <>
          <View style={styles.viewTitle}>
            <Text style={styles.wordTitle}>
              {definition.word || "Word not found"}
            </Text>
            <MaterialCommunityIcons
              name="book-open-variant"
              color="#b1b4b5"
              size={35}
              style={{ padding: 30 }}
            />
          </View>
          <View style={styles.translate}>
            {translatedWord && (
              <View style={styles.translationContainer}>
                <Text style={styles.translationText}>
                  Tradução: {translatedWord}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.viewPhonetic}>
            <Text style={styles.phonetic}>{definition.phonetic || " "}</Text>
            <Pressable onPress={playAudio}>
              <MaterialCommunityIcons
                name="volume-high"
                color="#38b6ff"
                size={30}
                style={{ padding: 5 }}
              />
            </Pressable>
          </View>
          <View style={styles.definitionsContainer}>
            {definition.meanings.map((meaning, index) => (
              <View key={index} style={styles.meaningBlock}>
                <Text style={styles.partOfSpeech}>
                  {meaning.partOfSpeech || "Unknown part of speech"}
                </Text>
                {meaning.definitions.map((def, defIndex) => (
                  <Text key={defIndex} style={styles.definitionText}>
                    - {def.definition}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
    alignItems: "center",
  },
  viewTitle: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingTop: 25,
  },
  wordTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  viewPhonetic: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  phonetic: {
    fontSize: 20,
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  definitionsContainer: {
    marginTop: 20,
    width: "100%",
  },
  meaningBlock: {
    marginBottom: 20,
  },
  partOfSpeech: {
    fontSize: 18,
    fontWeight: "bold",
  },
  definitionText: {
    fontSize: 16,
    marginVertical: 5,
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
