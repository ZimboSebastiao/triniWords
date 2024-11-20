import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para salvar a palavra no AsyncStorage
export const saveWord = async (word) => {
  try {
    const existingWords = await AsyncStorage.getItem("learnedWords");
    const wordsArray = existingWords ? JSON.parse(existingWords) : [];

    if (!wordsArray.includes(word)) {
      wordsArray.push(word);
      await AsyncStorage.setItem("learnedWords", JSON.stringify(wordsArray));
    }
  } catch (error) {
    console.error("Erro ao salvar palavra:", error);
  }
};
