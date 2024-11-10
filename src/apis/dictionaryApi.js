import axios from "axios";
import * as Sentry from "@sentry/react-native";

const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";
const MAX_RETRIES = 3;

export const fetchWordDefinition = async (word, retryDelay = 2000) => {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      const response = await axios.get(`${BASE_URL}/${word}`);

      // Verifica se a resposta está na estrutura esperada
      if (
        !response.data ||
        !Array.isArray(response.data) ||
        response.data.length === 0
      ) {
        const noDefinitionError = new Error(
          `Nenhuma definição encontrada para a palavra "${word}".`
        );
        Sentry.captureException(noDefinitionError, {
          contexts: { word },
        });
        return {
          error: `Nenhuma definição encontrada para a palavra "${word}".`,
        }; // Retorna um erro amigável, sem lançar exceção
      }

      return response.data;
    } catch (error) {
      // Envia erro para o Sentry com informações de contexto
      Sentry.captureException(error, {
        contexts: {
          wordLookup: {
            word,
            attempt: attempts + 1,
            retryDelay,
          },
        },
      });

      // Erro 404: Palavra não encontrada
      if (error.response && error.response.status === 404) {
        const notFoundError = new Error(
          "Palavra não encontrada no dicionário."
        );
        Sentry.captureException(notFoundError);
        return { error: "Palavra não encontrada no dicionário." }; // Retorna uma mensagem amigável
      }

      // Erro 429: Limite de requisições excedido
      if (error.response && error.response.status === 429) {
        attempts++;
        console.log(
          `Erro 429: tentativa ${attempts} de ${MAX_RETRIES}. Retentando em ${
            retryDelay / 1000
          } segundos...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        retryDelay *= 2; // Aumenta o tempo de espera a cada nova tentativa (backoff exponencial)
      } else {
        // Erros genéricos de requisição
        const genericError = new Error(
          "Erro ao buscar definição da palavra. Tente novamente."
        );
        Sentry.captureException(genericError);
        return {
          error: "Erro ao buscar definição da palavra. Tente novamente.",
        }; // Retorna uma mensagem amigável
      }
    }
  }

  // Falha após várias tentativas
  const retryExceededError = new Error(
    "Erro ao buscar definição da palavra após várias tentativas. Tente novamente mais tarde."
  );
  Sentry.captureException(retryExceededError);
  return {
    error:
      "Erro ao buscar definição da palavra após várias tentativas. Tente novamente mais tarde.",
  }; // Retorna uma mensagem amigável
};
