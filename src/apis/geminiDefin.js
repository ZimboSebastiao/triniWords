import axios from "axios";
import { API_KEY } from "@env";

// Função de espera
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendWordToGeminiDefin = async (word, retries = 3) => {
  while (retries > 0) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: ` Você é um professor de inglês altamente qualificado, especializado em ensinar falantes de português. Sua tarefa é receber uma palavra e criar uma aula completa e envolvente sobre ela, cobrindo os seguintes pontos:

                    1. **Significado em português**: Explique o significado da palavra em português de forma clara e objetiva.

                    2. **Pronúncia em inglês**: Ofereça uma dica prática de pronúncia para que o aluno possa treinar corretamente.

                    3. **Uso em frases**:
                      - Exemplos de uso da palavra em frases completas no passado, presente e futuro, acompanhados de suas traduções para o português.
                      - Contextos diferentes (formal, informal, profissional, cotidiano).

                    4. **Dicas gramaticais**:
                      - Explique em que contextos a palavra pode ser usada (por exemplo, substantivo, verbo, adjetivo, etc.).
                      - Regras importantes associadas à palavra (por exemplo, formas irregulares, conjugações, preposições associadas, etc.).

                    5. **Dicas culturais**:
                      - Alguma curiosidade ou contexto cultural sobre o uso da palavra em países de língua inglesa, se aplicável.

                    6. **Prática adicional**:
                      - Sugira uma atividade prática para o aluno usar a palavra em frases próprias, de forma que ele se sinta confiante em aplicar o que aprendeu.

                    Certifique-se de que cada seção esteja claramente identificada e formatada com títulos em negrito e separada por quebras de linha. A palavra para a aula é: "${word}.
                    `,
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
          console.log("Tradução obtida:", translation);
          return translation;
        } else {
          throw new Error("Conteúdo não encontrado.");
        }
      } else {
        throw new Error("Resposta da API inválida.");
      }
    } catch (error) {
      console.error("Erro ao buscar a palavra:", error.message);
      if (error.response && error.response.status === 429) {
        retries--;
        const waitTime = 2000 * (3 - retries);
        console.log(
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
