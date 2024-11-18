export const fetchRandomWord = async () => {
  try {
    // Faz a requisição para obter uma palavra aleatória
    const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");

    if (!response.ok) {
      const errorMessage = `Erro ao buscar palavra aleatória: ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const wordArray = await response.json();

    // Verifica se a API retornou uma palavra válida
    if (!Array.isArray(wordArray) || wordArray.length === 0) {
      const errorMessage = "Nenhuma palavra válida foi retornada pela API.";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Retorna a primeira palavra sorteada e para
    const word = wordArray[0];
    console.log("Palavra sorteada:", word); // Log para verificar a palavra retornada
    return word;  // Retorna a palavra e termina a execução

  } catch (error) {
    console.error("Erro ao buscar palavra aleatória:", error);
    return null;
  }
};
