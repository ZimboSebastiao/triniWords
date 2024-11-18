import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import * as Speech from "expo-speech";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PracticeScreen() {
  const [word, setWord] = useState("");

  // Função para adicionar pausas entre as frases com base na pontuação
  const processText = (text) => {
    // Substitui pontuação por pausas (em milissegundos)
    const processedText = text
      .replace(/([.?!])\s*/g, "$1|")  // Adiciona "|" após ponto, interrogação ou exclamação
      .replace(/,\s*/g, ",|")          // Adiciona uma pausa leve após vírgulas
      .replace(/\|/g, ",");            // Substitui "|" por vírgulas para representarem a pausa
    return processedText;
  };

  const playAudio = () => {
    const processedText = processText(word); // Processa o texto para adicionar pausas
    Speech.speak(processedText, {
      language: "en",
      pitch: 1,  // Ajuste o tom da voz, se necessário
      rate: 1,   // Ajuste a velocidade, 1 é normal
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write a sentence"
        value={word}
        onChangeText={setWord}
        autoCorrect={true}
        autoCapitalize="none"
        multiline={true} // Permite que o usuário escreva várias linhas
      />
      <Pressable onPress={playAudio} style={styles.button}>
        <MaterialCommunityIcons name="volume-high" size={30} color="#fff" />
        <Text style={styles.buttonText}>Listen to sentence</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 20,
    height: 150,
    textAlignVertical: "top",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#38b6ff",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
  },
});
