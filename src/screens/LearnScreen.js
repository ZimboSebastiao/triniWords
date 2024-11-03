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
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { sendWordToGemini } from "../apis/geminiTrans";

export default function LearnScreen() {
  const [wordData, setWordData] = useState(null);
  const [translatedWord, setTranslatedWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState(null);
  const [definition, setDefinition] = useState(null);

  const scheduleDailyNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Learn a new word!",
        body: "Don't forget to check out your new word of the day!",
      },
      // trigger: {
      //   hour: 8,
      //   minute: 0,
      //   repeats: true,
      // },
      trigger: null,
    });
  };

  const saveWord = async (word) => {
    try {
      const existingWords = await AsyncStorage.getItem("learnedWords");
      const wordsArray = existingWords ? JSON.parse(existingWords) : [];
      wordsArray.push(word);
      await AsyncStorage.setItem("learnedWords", JSON.stringify(wordsArray));
    } catch (error) {
      console.error("Error saving word:", error);
    }
  };

  const translateWord = async (word) => {
    try {
      const translatedText = await sendWordToGemini(word);
      return translatedText || "Tradução indisponível";
    } catch (error) {
      console.error("Erro na tradução:", error);
      return "Erro na tradução";
    }
  };

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          alert("Você precisa permitir notificações para usar este recurso.");
          return;
        }
      }
      await scheduleDailyNotification();
    };

    const fetchWord = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchRandomWord();
        console.log("Dados recebidos da API:", data);

        if (data && Array.isArray(data) && data.length > 0) {
          const wordDetail = data[0];

          if (wordDetail.word && wordDetail.phonetics) {
            setWordData(data);
            setDefinition(wordDetail);
            await saveWord(wordDetail.word);
            const translation = await translateWord(wordDetail.word);
            setTranslatedWord(translation);
          } else {
            console.warn("Estrutura de dados inesperada:", wordDetail);
            throw new Error("Word data is unavailable");
          }
        } else {
          console.warn("Resposta da API não contém dados válidos:", data);
          throw new Error("Word data is unavailable");
        }

        await scheduleDailyNotification();
      } catch (err) {
        console.error("Erro ao buscar a palavra:", err);
        setError("Failed to fetch the word: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    requestNotificationPermission();
    fetchWord();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playAudio = async () => {
    if (definition && definition.phonetics) {
      const audioUrl = definition.phonetics.find((p) => p.audio)?.audio;
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
          console.error("Erro ao reproduzir o áudio:", error);
        }
      } else {
        console.warn("URL do áudio não encontrado.");
      }
    } else {
      console.warn("Definição ou fonética não disponível.");
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#3BB3BD" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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

            <View style={styles.viewPhonetic}>
              <Text style={styles.phonetic}>{definition.phonetic || ""}</Text>
              <Pressable onPress={playAudio}>
                <MaterialCommunityIcons
                  name="volume-high"
                  color="#3BB3BD"
                  size={30}
                  style={{ padding: 5 }}
                />
              </Pressable>
            </View>
            <View style={styles.viewTranslation}>
              <Text style={styles.textTranslation}>{translatedWord}</Text>
            </View>

            <Text style={styles.origin}>{definition.origin || ""}</Text>

            {definition.meanings &&
              definition.meanings.map((meaning, index) => (
                <View key={index} style={styles.meaningContainer}>
                  <Text style={styles.partOfSpeech}>
                    {meaning.partOfSpeech}
                  </Text>
                  {meaning.definitions.map((def, i) => (
                    <View key={i} style={styles.definitionContainer}>
                      <Text style={styles.definition}>{def.definition}</Text>
                      {def.example && (
                        <Text style={styles.example}>
                          Example: {def.example}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  origin: {
    fontSize: 16,
    color: "#777",
  },
  meaningContainer: {
    marginVertical: 10,
  },
  partOfSpeech: {
    fontSize: 18,
    fontWeight: "bold",
  },
  definitionContainer: {
    marginLeft: 10,
  },
  definition: {
    fontSize: 20,
    marginVertical: 5,
  },
  example: {
    fontSize: 16,
    color: "#777",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  viewTranslation: {
    backgroundColor: "#d4d6d6",
    padding: 12,
    borderRadius: 10,
    width: "100%",
  },
  textTranslation: {
    color: "#30333C",
    fontWeight: "bold",
    fontSize: 15,
  },
});
