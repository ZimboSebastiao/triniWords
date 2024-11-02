import axios from "axios";

const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

export const fetchWordDefinition = async (word) => {
  try {
    const response = await axios.get(`${BASE_URL}/${word}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Palavra não encontrada no dicionário.");
    }
    throw new Error("Erro ao buscar definição da palavra. Tente novamente.");
  }
};
