// utils/wordStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveWord = async (newWord) => {
  try {
    const existingWords = await AsyncStorage.getItem("learnedWords");
    const wordsArray = existingWords ? JSON.parse(existingWords) : [];

    if (!wordsArray.includes(newWord)) {
      wordsArray.push(newWord);
      await AsyncStorage.setItem("learnedWords", JSON.stringify(wordsArray));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro ao salvar palavra:", error);
    return false;
  }
};
