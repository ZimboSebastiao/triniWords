import axios from "axios";
import { DEEPL_API_KEY } from "@env";

// Função que faz a tradução usando a API do DeepL
export const translateWord = async (word) => {
  const apiKey = DEEPL_API_KEY; // Usando a chave da variável de ambiente
  const url = "https://api-free.deepl.com/v2/translate";

  try {
    const response = await axios.post(url, null, {
      params: {
        auth_key: apiKey,
        text: word,
        target_lang: "PT", // Idioma de destino (Português)
        source_lang: "EN", // Detectar automaticamente o idioma de origem
      },
    });
    return response.data.translations[0].text; // Retorna a tradução da palavra
  } catch (error) {
    console.error("Erro ao traduzir a palavra:", error.message);
    return null;
  }
};
