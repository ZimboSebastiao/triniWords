import axios from "axios";
import { API_KEY } from "@env";


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
                  text: `Você é um professor de inglês altamente qualificado, especializado em ensinar falantes de português. Sua tarefa é receber uma palavra e criar uma aula completa e envolvente sobre ela, cobrindo os seguintes pontos:

                  1. Significado em português: Explique o significado da palavra de forma clara e objetiva, considerando diferentes nuances e usos.

                  2. Pronúncia em inglês: Forneça uma dica prática de pronúncia, com uma transcrição fonética e sugestões para treinar a pronúncia corretamente.
                  Se a palavra tiver sons difíceis ou típicos do inglês, forneça explicações detalhadas para facilitar o aprendizado.

                  3. Uso em frases: Exemplos de uso da palavra em frases completas nos seguintes tempos verbais: presente, passado, futuro, presente perfeito, passado perfeito, futuro perfeito e condicional.
                  Acompanhe cada exemplo com suas traduções para o português e explique brevemente o significado no contexto de cada frase.
                  Ofereça frases nos contextos formal, informal, profissional e cotidiano, mostrando a flexibilidade e aplicabilidade da palavra em diferentes situações.

                  
                  4. Dicas gramaticais:   Explique os diferentes contextos em que a palavra pode ser usada (por exemplo, substantivo, verbo, adjetivo, advérbio, etc.), com exemplos práticos.
                  Se a palavra for irregular ou tiver formas alternativas (como verbos irregulares, plurais irregulares, adjetivos com formas comparativas e superlativas), forneça uma explicação detalhada.
                  Preposições: Identifique e explique preposições ou frases prepositivas comumente associadas à palavra, quando aplicável. Mostre exemplos claros de como essas preposições alteram o significado das frases.
                  Artigos: Explique quais artigos usar com a palavra (o, a, os, as, um, uma) e justifique sua escolha com base na regra gramatical. Por exemplo, quando usar o artigo "a" e quando usar "an".
                  Possessivos e substantivos: Indique quais possessivos (my, your, his, her, its, our, their) são apropriados e explique como escolher o possessivo correto dependendo do contexto. Explique também como escolher o substantivo correto (singular ou plural) e como a palavra se comporta em diferentes contextos (contável ou incontável, por exemplo).
                  Variações entre o inglês britânico e americano: Se for relevante, forneça exemplos e destaque as diferenças entre o uso da palavra no inglês britânico e no inglês americano.


                  5. Dicas culturais: Ofereça uma curiosidade ou contexto cultural sobre o uso da palavra em países de língua inglesa, como a diferença de significados ou conotações em diferentes países ou dialetos.
                  Se a palavra estiver associada a expressões idiomáticas ou gírias, inclua explicações sobre essas expressões e seus significados.

                  
                  6. Falsos cognatos e palavras similares: Informe sobre possíveis falsos cognatos ou palavras semelhantes em português que podem gerar confusão, destacando suas diferenças e dando exemplos de uso.

                  
                  7. Prática adicional: Sugira atividades práticas, como exercícios de completar frases, criar sentenças próprias ou transformar frases em diferentes tempos verbais.
                  Ofereça questões para que o aluno escreva ou fale sobre a palavra, aplicando o que aprendeu de forma criativa.
                  Proponha também um desafio de conversação, caso o aluno esteja em um nível intermediário ou avançado, incentivando o uso da palavra em um diálogo.

                  
                  Observação Importante:

                  Ao criar suas aulas, evite se referir ao público de forma genérica, como "Olá a todos" ou "Olá, alunos". Prefira sempre o singular, tratando o aluno individualmente, como "Olá, aluno!" ou "Bem-vindo à aula de hoje!". Foque diretamente no conteúdo da aula e no aprendizado do aluno, sem alongar saudações.

                  Estruture bem suas explicações, mantendo uma linha de raciocínio clara e objetiva. Use emojis quando apropriado para tornar a aula mais envolvente e visualmente interessante, mas sempre de forma comedida, sem exageros. Lembre-se de que o foco principal é a clareza e a eficiência no ensino.
                  A palavra para a aula é: "${word}".`,
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
          const noContentError = new Error("Conteúdo não encontrado.");
         
          throw noContentError;
        }
      } else {
        const invalidResponseError = new Error("Resposta da API inválida.");
      
        throw invalidResponseError;
      }
    } catch (error) {
     
      console.error(
        "Erro ao buscar a palavra:",
        error.message || error.response?.data || error
      );

      if (error.response) {
        const { status } = error.response;

        if (status === 429) {
          retries--;
          const waitTime = 500 * (3 - retries);
          console.log(
            `Limite de requisições excedido. Tentando novamente em ${
              waitTime / 1000
            } segundos...`
          );
          await delay(waitTime);
        } else if (status === 403) {
          const quotaError = new Error(
            "Cota insuficiente. Verifique seu plano e detalhes de faturamento."
          );
        
          console.error(quotaError.message);
          return quotaError.message;
        } else {
          const processingError = new Error(
            "Erro ao processar a mensagem ou problema de limite."
          );
      
          console.error(
            "Erro ao processar a mensagem:",
            error.response?.data || error.message
          );
          throw processingError;
        }
      } else {
        const unknownError = new Error("Erro desconhecido.");
    
        console.error("Erro desconhecido:", error.message || error);
        throw unknownError;
      }
    }
  }

  const retryLimitError = new Error(
    "Limite de tentativas atingido. Por favor, tente novamente mais tarde."
  );
 
  return retryLimitError.message;
};
