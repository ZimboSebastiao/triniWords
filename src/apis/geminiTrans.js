// geminiTrans.js
import axios from "axios";
import { KEY_TRANS } from "@env";
import * as Sentry from "@sentry/react-native"; // Importando o Sentry

// Função de espera
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendWordToGemini = async (word, retries = 3) => {
  while (retries > 0) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${KEY_TRANS}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Por favor, traduza a seguinte palavra para o português: "${word}". Não inclua contexto adicional ou explicações. Apenas forneça a tradução para o português.`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta da API:", JSON.stringify(response.data, null, 2));

      // Verifique se a estrutura da resposta é válida antes de acessar as propriedades
      if (response.data.candidates && response.data.candidates.length > 0) {
        const parts = response.data.candidates[0].content?.parts;
        if (Array.isArray(parts) && parts.length > 0) {
          const translation = parts[0].text.trim();
          console.log("Tradução obtida:", translation);
          return translation;
        } else {
          throw new Error(
            "Conteúdo não encontrado na resposta da API ou estrutura inesperada."
          );
        }
      } else {
        throw new Error(
          "Resposta da API inválida, candidatos não encontrados."
        );
      }
    } catch (error) {
      // Captura de erro no Sentry
      Sentry.captureException(error);

      console.error("Erro ao buscar a palavra:", error.message);

      // Verificação de erro de rede (timeout, DNS, etc.)
      if (!error.response) {
        console.error("Erro de rede ou falha na conexão:", error.message);
        // Captura de erro de rede
        Sentry.captureMessage("Erro de rede ou falha na conexão", "error");
        return "Erro de rede ou falha na conexão. Por favor, tente novamente.";
      }

      // Erros baseados no código de status HTTP
      switch (error.response.status) {
        case 429: // Limite de requisições excedido
          retries--;
          const waitTime = 2000 * (3 - retries);
          console.log(
            `Limite de requisições excedido. Tentando novamente em ${
              waitTime / 1000
            } segundos...`
          );
          await delay(waitTime);
          break;

        case 403: // Cota insuficiente
          console.error(
            "Cota insuficiente. Verifique seu plano e detalhes de faturamento."
          );
          // Captura de erro 403
          Sentry.captureMessage(
            "Cota insuficiente. Verifique seu plano e detalhes de faturamento",
            "error"
          );
          return "Cota insuficiente. Verifique seu plano e detalhes de faturamento.";

        case 500: // Erro interno do servidor
        case 502: // Bad Gateway
        case 503: // Serviço indisponível
        case 504: // Timeout do gateway
          console.error(
            `Erro no servidor: ${error.response.status}. Tentando novamente...`
          );
          retries--;
          await delay(5000); // Espera 5 segundos e tenta novamente
          break;

        default:
          console.error(
            "Erro inesperado ao processar a mensagem:",
            error.response ? error.response.data : error.message
          );
          // Captura de erro inesperado
          Sentry.captureMessage(
            `Erro inesperado: ${error.response?.status || error.message}`,
            "error"
          );
          throw new Error(
            `Erro inesperado ao processar a mensagem. Código: ${error.response.status}`
          );
      }
    }
  }

  return "Limite de tentativas atingido. Por favor, tente novamente mais tarde.";
};
