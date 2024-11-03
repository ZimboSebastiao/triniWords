// src/apis/randomWordApi.js
export const fetchRandomWord = async () => {
  try {
    // Obtendo uma palavra aleatória
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1"
    );
    const wordArray = await response.json();
    const word = wordArray[0];

    // Obtendo a definição da palavra
    const definitionResponse = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const definition = await definitionResponse.json();

    return definition;
  } catch (error) {
    console.error("Error fetching random word:", error);
    return null;
  }
};
