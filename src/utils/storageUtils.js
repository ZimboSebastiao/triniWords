import AsyncStorage from "@react-native-async-storage/async-storage";

const WORD_HISTORY_KEY = "wordHistory";
const LAST_RUN_DATE_KEY = "lastRunDate";

export const saveWordHistory = async (word) => {
  const history = await getWordHistory();
  history.push(word);
  await AsyncStorage.setItem(WORD_HISTORY_KEY, JSON.stringify(history));
};

export const getWordHistory = async () => {
  const history = await AsyncStorage.getItem(WORD_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

export const saveLastRunDate = async () => {
  const today = new Date().toISOString().split("T")[0];
  await AsyncStorage.setItem(LAST_RUN_DATE_KEY, today);
};

export const wasRunToday = async () => {
  const today = new Date().toISOString().split("T")[0];
  const lastRunDate = await AsyncStorage.getItem(LAST_RUN_DATE_KEY);
  return lastRunDate === today;
};
