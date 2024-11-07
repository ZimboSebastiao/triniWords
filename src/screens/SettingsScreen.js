import React, { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { useSearchHistory } from "../context/SearchHistoryContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  const { searchHistory, addSearchTerm } = useSearchHistory();

  const handleSearch = (term) => {
    navigation.navigate("SearchScreen", { word: term });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 50,
      }}
    >
      <View style={styles.viewIcons}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons
            name="arrow-left-thin"
            color="#38b6ff"
            size={35}
          />
        </Pressable>
        <Text style={styles.title}>Historic</Text>
        <MaterialCommunityIcons name="arm-flex" color="#38b6ff" size={35} />
      </View>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 20,
          marginTop: 50,
          fontWeight: "bold",
        }}
      >
        Search History
      </Text>
      {searchHistory.length === 0 ? (
        <View
          style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.noHistoryText}>History is empty</Text>
          <Image
            style={styles.noData}
            source={require("../../assets/images/man.png")}
          />
        </View>
      ) : (
        <FlatList
          data={searchHistory}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSearch(item)}
              style={({ pressed }) => [
                {
                  padding: 10,
                  backgroundColor: pressed ? "#38b6ff" : "#ededed",
                  marginVertical: 5,
                  borderRadius: 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={{ fontSize: 18 }}>{item}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color="#b1b4b5"
                size={35}
              />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
  },
  viewIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
    color: "#30333C",
  },
  noHistoryText: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
    color: "#777",
  },
  noData: {
    width: 290,
    height: 290,
  },
});
