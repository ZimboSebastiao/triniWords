const fetchFromAPI = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao acessar ${url}:`, error.message);
    return null;
  }
};

const validateWordInDictionary = async (word) => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const data = await fetchFromAPI(url);
  return data && Array.isArray(data) && data.length > 0; // Retorna `true` se a palavra for válida
};

export const fetchRandomWord = async () => {
  const randomWordAPI = "https://random-word-api.herokuapp.com/word?number=1";
  const maxTries = 10;

  for (let attempt = 1; attempt <= maxTries; attempt++) {
    console.log(`Tentativa ${attempt} de ${maxTries}...`);

    // Obtém uma palavra aleatória
    const wordArray = await fetchFromAPI(randomWordAPI);
    if (!wordArray || !Array.isArray(wordArray) || wordArray.length === 0) {
      console.warn(
        "API de palavras aleatórias não retornou dados válidos. Tentando novamente."
      );
      continue;
    }

    const randomWord = wordArray[0];
    console.log(
      `Palavra sorteada: "${randomWord}". Verificando no dicionário...`
    );

    // Verifica se a palavra é válida no dicionário
    const isValid = await validateWordInDictionary(randomWord);
    if (isValid) {
      console.log(`Palavra válida encontrada: "${randomWord}".`);
      return randomWord;
    }

    console.warn(`Palavra "${randomWord}" não é válida. Tentando novamente.`);
  }

  console.error(
    "Não foi possível encontrar uma palavra válida após várias tentativas."
  );
  return null;
};
