// SearchHistoryContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchHistoryContext = createContext();

export const useSearchHistory = () => useContext(SearchHistoryContext);

export const SearchHistoryProvider = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem("searchHistory");
        if (history !== null) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error("Erro ao carregar do AsyncStorage:", error);
      }
    };
    loadSearchHistory();
  }, []);

  const addSearchTerm = async (term) => {
    try {
      const updatedHistory = [...new Set([...searchHistory, term])];
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedHistory)
      );
      console.log("Histórico atualizado:", updatedHistory);
    } catch (error) {
      console.error("Erro ao armazenar no AsyncStorage:", error);
    }
  };

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, addSearchTerm }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};
