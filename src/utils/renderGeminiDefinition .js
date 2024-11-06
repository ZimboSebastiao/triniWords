import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { sendWordToGeminiDefin } from "../apis/geminiDefin";
import Markdown from "react-native-markdown-display";

const GeminiDefinition = ({ word }) => {
  const [geminiDefinition, setGeminiDefinition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeminiDefinition = async () => {
      try {
        const response = await sendWordToGeminiDefin(word);
        setGeminiDefinition(response);
      } catch (error) {
        console.error("Erro ao buscar definição do Gemini:", error);
      } finally {
        setLoading(false);
      }
    };

    if (word) {
      fetchGeminiDefinition();
    }
  }, [word]);

  if (loading) return <ActivityIndicator size="large" color="#38b6ff" />;
  //   if (!geminiDefinition) return <Text>Definição não disponível.</Text>;

  return (
    <View style={styles.definitionContainer}>
      <Markdown style={styles.definitionText}>{geminiDefinition}</Markdown>
    </View>
  );
};

const styles = StyleSheet.create({
  definitionContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  definitionText: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default GeminiDefinition;
