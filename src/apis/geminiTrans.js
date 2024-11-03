import axios from "axios";
import { KEY_TRANS } from "@env";

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

      if (response.data.candidates && response.data.candidates.length > 0) {
        const parts = response.data.candidates[0].content.parts;
        if (parts && parts.length > 0) {
          const translation = parts[0].text.trim();
          console.log("Tradução obtida:", translation); // Log da tradução
          return translation; // Retorna a tradução
        } else {
          throw new Error("Conteúdo não encontrado.");
        }
      } else {
        throw new Error("Resposta da API inválida.");
      }
    } catch (error) {
      console.error("Erro ao buscar a palavra:", error.message); // Log do erro
      if (error.response && error.response.status === 429) {
        retries--;
        const waitTime = 2000 * (3 - retries);
        console.warn(
          `Limite de requisições excedido. Tentando novamente em ${
            waitTime / 1000
          } segundos...`
        );
        await delay(waitTime);
      } else if (error.response && error.response.status === 403) {
        console.error(
          "Cota insuficiente. Verifique seu plano e detalhes de faturamento."
        );
        return "Cota insuficiente. Verifique seu plano e detalhes de faturamento.";
      } else {
        console.error(
          "Erro ao processar a mensagem:",
          error.response ? error.response.data : error.message
        );
        throw new Error("Erro ao processar a mensagem ou problema de limite.");
      }
    }
  }

  return "Limite de tentativas atingido. Por favor, tente novamente mais tarde.";
};
