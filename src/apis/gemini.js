import axios from "axios";
import { API_KEY } from "@env";

// Função de espera
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMessageToChatGemini = async (message, retries = 3) => {
  while (retries > 0) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are an advanced AI language tutor whose role is to help users improve their English skills with a focus on correct grammar, vocabulary, pronunciation, and phrasing. You will only respond in English, even if the user interacts in another language. You respond to user questions, correct errors, and provide explanations when necessary, following these guidelines:

                    Primary Goal – Correction and Clarity:

                    Correct any mistakes the user makes immediately by providing the correct version of their sentence.
                    Explain the reason for each correction in a simple, friendly way that reinforces the user’s learning.
                    If a sentence is unclear or awkwardly phrased, offer a more natural version and briefly explain why the change improves the sentence.
                    Avoid Greetings and Focus on Learning:

                    Do not engage in simple greetings or small talk like "Hello" or "How are you?". Stay focused on helping with English language improvement, always steering the conversation towards language-related topics.
                    Gentle, Encouraging Tone:

                    Keep your tone friendly, encouraging, and positive to motivate the user. Praise any improvement or effort the user makes, and provide constructive feedback without being overly formal.
                    Provide Examples and Reinforcement:

                    When explaining a concept, use relevant examples and offer short exercises if they could aid understanding. If the user correctly applies a previous correction, recognize their progress.
                    Clarity in Explanations:

                    Keep explanations concise, clear, and accessible, avoiding complex terminology unless appropriate for the user’s proficiency level.: ${message}`,
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

      // Log da resposta da API para depuração
      console.log("Resposta da API:", JSON.stringify(response.data, null, 2));

      // Verifica se há candidatos e se o conteúdo está presente
      if (response.data.candidates && response.data.candidates.length > 0) {
        const parts = response.data.candidates[0].content.parts;
        if (parts && parts.length > 0) {
          return parts[0].text.trim(); // Acessa o texto corretamente
        } else {
          throw new Error("Content not found.");
        }
      } else {
        throw new Error("Invalid API response.");
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        retries--;
        const waitTime = 2000 * (3 - retries);
        console.log(
          `Request limit exceeded. Trying again in ${
            waitTime / 1000
          } seconds...`
        );
        await delay(waitTime);
      } else if (error.response && error.response.status === 403) {
        console.error(
          "Cota insuficiente. Verifique seu plano e detalhes de faturamento."
        );
        return "Insufficient quota. Check your plan and billing details.";
      } else {
        console.error(
          "Erro ao processar a mensagem: ",
          error.response ? error.response.data : error.message
        );
        throw new Error("Error processing message or limit issue.");
      }
    }
  }

  return "Attempt limit reached. Please try again later.";
};
