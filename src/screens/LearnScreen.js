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

import { fetchWordOfTheDay } from "../apis/wordOfTheDayApi";
import { saveWord } from "../utils/wordStorage";
import { translateWord } from "../utils/translate";
import { shareContent } from "../utils/shareUtils";

export default function LearnScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState(null);
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [translatedWord, setTranslatedWord] = useState(null);
  const [learnedWords, setLearnedWords] = useState([]);

  const fetchWordOfTheDayHandler = async () => {
    try {
      setLoading(true);
      const data = await fetchWordOfTheDay();
      console.log("API Response:", data);
      setWordOfTheDay(data);
      const translation = await translateWord(data.word);
      setTranslatedWord(translation);
    } catch (err) {
      setError("Failed to fetch word of the day.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWord = async () => {
    if (!wordOfTheDay?.word) {
      console.error("No word to save.");
      return;
    }

    const isSaved = await saveWord(wordOfTheDay.word);
    if (isSaved) {
      console.log("Word saved successfully!");
      setLearnedWords((prevWords) => [...prevWords, wordOfTheDay.word]); // Atualiza o estado local
    } else {
      console.log("Word already saved.");
    }
  };

  useEffect(() => {
    fetchWordOfTheDayHandler();

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  const playAudio = async () => {
    const audioUrl = wordOfTheDay?.phonetics?.find((p) => p.audio)?.audio;

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
        Speech.speak(wordOfTheDay?.word || "Word not available", {
          language: "en",
        });
      }
    } else {
      Speech.speak(wordOfTheDay?.word || "Word not available", {
        language: "en",
      });
    }
  };

  const handleShare = () => {
    const content = `
  📝 **Word:** ${wordOfTheDay?.word}
  
  🌐 **Translation:** ${translatedWord}
  
  📖 **Definition:**
  ${wordOfTheDay?.meanings
    ?.map((meaning, index) => {
      const definitions = meaning.definitions
        .map((def) => `- ${def.definition}`)
        .join("\n");
      return `${meaning.partOfSpeech}:\n${definitions}`;
    })
    .join("\n\n")}
  
  📅 **Origin:** ${wordOfTheDay?.origin || "Date unavailable"}
  `;

    shareContent(content);
  };

  if (loading) return <ActivityIndicator size="large" color="#38b6ff" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <>
          {/* Título e botões */}
          <View style={styles.viewTitle}>
            <Text style={styles.wordTitle}>
              {wordOfTheDay?.word || "Word not found"}
            </Text>
            <MaterialCommunityIcons
              name="book-open-variant"
              color="#b1b4b5"
              size={35}
              style={{ padding: 30 }}
            />
            <Pressable
              onPress={handleShare}
              style={({ pressed }) => [
                styles.shareButton,
                pressed && styles.pressed,
              ]}
            >
              <MaterialCommunityIcons
                name="share-variant"
                color="#38b6ff"
                size={35}
                style={{ padding: 10 }}
              />
            </Pressable>
          </View>
          <View>
            {translatedWord && (
              <Text style={styles.translationText}>
                Tradução: {translatedWord}
              </Text>
            )}
          </View>
          <Pressable
            onPress={playAudio}
            style={({ pressed }) => [
              styles.audioButton,
              pressed && styles.audioButtonPressed,
            ]}
          >
            <MaterialCommunityIcons
              name="volume-high"
              size={32}
              color="#38b6ff"
            />
          </Pressable>

          {/* Definições */}
          <View style={styles.definitionsContainer}>
            <Text style={styles.sectionTitle}>Definitions:</Text>
            {wordOfTheDay?.definitions?.length > 0 ? (
              wordOfTheDay.definitions.map((def, index) => (
                <View key={index} style={styles.meaningBlock}>
                  <Text style={styles.partOfSpeech}>
                    {def.partOfSpeech || "Unknown part of speech"}
                  </Text>
                  <Text style={styles.definitionText}>
                    - {def.text || "No definition available"}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.definitionText}>
                No definitions available
              </Text>
            )}
          </View>

          {/* Exemplos */}
          <View style={styles.examplesContainer}>
            <Text style={styles.sectionTitle}>Examples:</Text>
            {wordOfTheDay?.examples?.length > 0 ? (
              wordOfTheDay.examples.map((example, index) => (
                <View key={index} style={styles.exampleBlock}>
                  <Text style={styles.exampleText}>
                    "{example.text}" - {example.title || "Unknown source"}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.exampleText}>No examples available</Text>
            )}
          </View>

          {/* Nota */}
          <View style={styles.noteContainer}>
            <Text style={styles.sectionTitle}>Note:</Text>
            <Text style={styles.noteText}>
              {wordOfTheDay?.note || "No additional note available"}
            </Text>
          </View>
          <Pressable
            onPress={handleSaveWord}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons name="bookmark" size={32} color="#38b6ff" />
          </Pressable>
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
  infoContainer: {
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: 16,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#666",
  },
  definitionsContainer: {
    marginTop: 20,
    width: "100%",
  },
  examplesContainer: {
    marginTop: 20,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  definitionText: {
    fontSize: 16,
    marginVertical: 5,
  },
  exampleText: {
    fontSize: 16,
    marginVertical: 5,
    fontStyle: "italic",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  shareButton: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 0,
    margin: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  pressed: {
    backgroundColor: "#38b6ff",
    opacity: 0.2,
    borderRadius: 50,
  },
  translationText: {
    fontSize: 18,
    color: "#38b6ff",
    marginTop: 5,
  },
});
