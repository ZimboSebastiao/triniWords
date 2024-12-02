import axios from "axios";
import { WORDNIK_API_KEY } from "@env";

const API_KEY = WORDNIK_API_KEY;

export const fetchWordOfTheDay = async () => {
  try {
    const response = await axios.get(
      `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching word of the day:", error);
    throw error;
  }
};
