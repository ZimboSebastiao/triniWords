import axios from "axios";

const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";
const MAX_RETRIES = 3;

export const fetchWordDefinition = async (word, retryDelay = 2000) => {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      const response = await axios.get(`${BASE_URL}/${word}`);

      if (
        !response.data ||
        !Array.isArray(response.data) ||
        response.data.length === 0
      ) {
        const noDefinitionError = new Error(
          `Nenhuma definição encontrada para a palavra "${word}".`
        );
        console.error(noDefinitionError.message); // Log de erro detalhado
        return {
          error: `Nenhuma definição encontrada para a palavra "${word}".`,
        };
      }

      return response.data;
    } catch (error) {
      attempts++;

      if (error.response) {
        if (error.response.status === 404) {
          console.error(
            `Erro 404: Palavra "${word}" não encontrada no dicionário.`
          );
          return { error: "Palavra não encontrada no dicionário." };
        }

        if (error.response.status === 429) {
          console.log(
            `Erro 429: tentativa ${attempts} de ${MAX_RETRIES}. Retentando em ${
              retryDelay / 1000
            } segundos...`
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          retryDelay *= 2; // Exponencial backoff
          continue;
        }
      }

      // Caso de erro genérico
      const genericError = new Error(
        "Erro ao buscar definição da palavra. Tente novamente."
      );
      console.error(genericError.message, error); // Log completo do erro
      return {
        error: "Erro ao buscar definição da palavra. Tente novamente.",
      };
    }
  }

  const retryExceededError = new Error(
    "Erro ao buscar definição da palavra após várias tentativas. Tente novamente mais tarde."
  );
  console.error(retryExceededError.message); // Log detalhado de erro
  return {
    error:
      "Erro ao buscar definição da palavra após várias tentativas. Tente novamente mais tarde.",
  };
};
