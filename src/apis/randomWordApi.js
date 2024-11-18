

export const fetchRandomWord = async () => {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1"
    );

    if (!response.ok) {
      const errorMessage = `Erro ao buscar palavra aleatória: ${response.statusText}`;
      console.error(errorMessage);
 
      throw new Error(errorMessage);
    }

    const wordArray = await response.json();
    if (!wordArray || wordArray.length === 0) {
      const errorMessage = "Nenhuma palavra foi retornada pela API.";
      console.error(errorMessage);

      throw new Error(errorMessage);
    }

    const word = wordArray[0];

    const definitionResponse = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!definitionResponse.ok) {
      const errorMessage = `Erro ao buscar definição da palavra ${word}: ${definitionResponse.statusText}`;
      console.error(errorMessage);
   
      throw new Error(errorMessage);
    }

    const definition = await definitionResponse.json();

    if (!definition || !definition[0]) {
      const errorMessage = `Definição não encontrada para a palavra ${word}.`;
      console.error(errorMessage);
     
      throw new Error(errorMessage);
    }

    return definition;
  } catch (error) {
    console.error("Erro ao buscar palavra aleatória:", error);

    return null;
  }
};
