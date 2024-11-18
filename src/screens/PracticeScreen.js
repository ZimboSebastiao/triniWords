import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import * as Speech from "expo-speech";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PracticeScreen() {
  const [word, setWord] = useState("");

  
  const processText = (text) => {
   
    return text
      .replace(/([.?!])\s*/g, "$1|")  
      .replace(/,\s*/g, ",|")           
      .replace(/\|/g, ",");             
  };

  const playAudio = () => {
    const processedText = processText(word); 
    Speech.speak(processedText, {
      language: "en",
      pitch: 1.2,   
      rate: 0.9,    
      onDone: () => console.log("Finished speaking"),
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
        multiline={true} 
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
