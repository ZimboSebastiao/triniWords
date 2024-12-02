// utils/wordStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveWord = async (newWord) => {
  try {
    const existingWords = await AsyncStorage.getItem("learnedWords");
    const wordsArray = existingWords ? JSON.parse(existingWords) : [];

    // Se a palavra não existir, adicione
    if (!wordsArray.includes(newWord)) {
      wordsArray.push(newWord);
      await AsyncStorage.setItem("learnedWords", JSON.stringify(wordsArray));
      return true; // Indica que a palavra foi salva com sucesso
    } else {
      return false; // Indica que a palavra já está salva
    }
  } catch (error) {
    console.error("Erro ao salvar palavra:", error);
    return false;
  }
};
