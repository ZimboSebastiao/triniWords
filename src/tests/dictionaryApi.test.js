// dictionaryApi.test.js
import axios from "axios";
import { fetchWordDefinition } from "../apis/dictionaryApi";

jest.mock("axios");

describe("fetchWordDefinition", () => {
  const word = "test";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar a definição da palavra quando a requisição é bem-sucedida", async () => {
    const mockData = [
      {
        word: "test",
        meanings: [{ definition: "a procedure for critical evaluation" }],
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchWordDefinition(word);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
  });

  it('deve lançar um erro "Palavra não encontrada no dicionário" quando a API retorna 404', async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    await expect(fetchWordDefinition(word)).rejects.toThrow(
      "Palavra não encontrada no dicionário."
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("deve fazer novas tentativas quando a API retorna erro 429 e eventualmente retornar a definição", async () => {
    const mockData = [
      {
        word: "test",
        meanings: [{ definition: "a procedure for critical evaluation" }],
      },
    ];

    axios.get
      .mockRejectedValueOnce({ response: { status: 429 } })
      .mockRejectedValueOnce({ response: { status: 429 } })
      .mockResolvedValueOnce({ data: mockData });

    const result = await fetchWordDefinition(word);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledTimes(3);
  });

  it("deve lançar um erro específico após o número máximo de tentativas para erro 429", async () => {
    axios.get.mockRejectedValue({ response: { status: 429 } });

    await expect(fetchWordDefinition(word, 100)).rejects.toThrow(
      "Erro ao buscar definição da palavra após várias tentativas. Tente novamente mais tarde."
    );
  });

  it("deve lançar um erro genérico para outros erros de rede", async () => {
    axios.get.mockRejectedValueOnce(new Error("Erro de rede desconhecido"));

    await expect(fetchWordDefinition(word)).rejects.toThrow(
      "Erro ao buscar definição da palavra. Tente novamente."
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
