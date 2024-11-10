import * as Sentry from "@sentry/react-native"; // Importe o Sentry

export const fetchRandomWord = async () => {
  try {
    // Obtendo uma palavra aleatória
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1"
    );

    if (!response.ok) {
      // Captura erro de status de resposta
      const errorMessage = `Erro ao buscar palavra aleatória: ${response.statusText}`;
      console.error(errorMessage);
      Sentry.captureMessage(errorMessage);
      throw new Error(errorMessage);
    }

    const wordArray = await response.json();
    if (!wordArray || wordArray.length === 0) {
      // Captura caso a resposta seja um array vazio
      const errorMessage = "Nenhuma palavra foi retornada pela API.";
      console.error(errorMessage);
      Sentry.captureMessage(errorMessage);
      throw new Error(errorMessage);
    }

    const word = wordArray[0];

    // Obtendo a definição da palavra
    const definitionResponse = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!definitionResponse.ok) {
      // Captura erro de status de resposta da definição
      const errorMessage = `Erro ao buscar definição da palavra ${word}: ${definitionResponse.statusText}`;
      console.error(errorMessage);
      Sentry.captureMessage(errorMessage);
      throw new Error(errorMessage);
    }

    const definition = await definitionResponse.json();

    // Verifica se a definição foi retornada corretamente
    if (!definition || !definition[0]) {
      const errorMessage = `Definição não encontrada para a palavra ${word}.`;
      console.error(errorMessage);
      Sentry.captureMessage(errorMessage);
      throw new Error(errorMessage);
    }

    return definition;
  } catch (error) {
    // Captura qualquer erro geral e envia para o Sentry
    console.error("Erro ao buscar palavra aleatória:", error);
    Sentry.captureException(error); // Envia o erro para o Sentry
    return null;
  }
};
