import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import * as Speech from "expo-speech";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PracticeScreen() {
  const [word, setWord] = useState("");

  // Função de áudio: fala a palavra corrigida
  const playAudio = () => {
    Speech.speak(word, {
      language: "en",
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma palavra em inglês"
        value={word}
        onChangeText={setWord} // Atualiza a palavra conforme o usuário digita
        autoCorrect={true} // Habilita a autocorreção nativa
        autoCapitalize="none" // Não faz autocapitalização
      />
      <Pressable onPress={playAudio} style={styles.button}>
        <MaterialCommunityIcons name="volume-high" size={30} color="#fff" />
        <Text style={styles.buttonText}>Falar Palavra</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
