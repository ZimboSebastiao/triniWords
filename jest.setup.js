// jest.setup.js
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Mock de módulos nativos
jest.mock("expo-av", () => ({
  Audio: {
    setIsEnabledAsync: jest.fn(),
    playAsync: jest.fn(),
    stopAsync: jest.fn(),
  },
}));

jest.mock("expo-speech", () => ({
  speakAsync: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => ({
  MaterialCommunityIcons: {
    name: "test-icon",
  },
}));

// Mock do AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
