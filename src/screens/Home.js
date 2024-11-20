import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar, Card, ProgressBar, MD3Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { fetchWordDefinition } from "../apis/dictionaryApi";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate("SearchScreen", { word: searchQuery.trim() });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.saudacao}>
        <Text style={styles.title}>Hi There 👋</Text>
        <Text style={styles.subtitle}>
          What would you like to train today? Search below.
        </Text>
      </View>
      <View style={styles.search}>
        <Searchbar
          placeholder="Looking for..."
          placeholderTextColor="#b1b4b5"
          iconColor="#38b6ff"
          clearIcon="close"
          clearIconColor="#38b6ff"
          style={styles.searchbar}
          inputStyle={styles.input}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>
      <View style={styles.studying}>
        <Text style={styles.title}>STUDYING</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.viewButtons}>
            <Pressable
              style={[styles.learn, styles.spacing]}
              onPress={() => navigation.navigate("LearnScreen")}
            >
              <Card style={{ width: 200, backgroundColor: "#fff" }}>
                <Card.Cover
                  source={require("../../assets/images/img1.jpg")}
                  style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    height: 160,
                  }}
                />
                <Card.Content style={{ padding: 10 }}>
                  <Text
                    style={{ color: "#38b6ff", fontWeight: "bold", padding: 4 }}
                    variant="titleLarge"
                  >
                    Learn
                  </Text>
                  <Text
                    style={{
                      color: "#30333C",
                      fontWeight: "bold",
                      fontSize: 16,
                      padding: 4,
                    }}
                    variant="bodyMedium"
                  >
                    Let's Learn a New Word in English
                  </Text>
                  <View style={styles.viewProgress}>
                    <Text
                      style={{
                        color: "#b1b4b5",
                        fontWeight: "bold",
                        padding: 4,
                      }}
                      variant="bodyMedium"
                    >
                      New Word
                    </Text>
                    <ProgressBar
                      progress={0.5}
                      color="#38b6ff"
                      style={{ width: 40, height: 8, borderRadius: 20 }}
                      variant="bodyMedium"
                    />
                  </View>
                </Card.Content>
              </Card>
            </Pressable>

            <Pressable
              style={[styles.learn, styles.spacing]}
              onPress={() => navigation.navigate("PracticeScreen")}
            >
              <Card style={{ width: 200, backgroundColor: "#fff" }}>
                <Card.Cover
                  source={require("../../assets/images/img2.jpg")}
                  style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    height: 160,
                  }}
                />
                <Card.Content style={{ padding: 10 }}>
                  <Text
                    style={{ color: "#38b6ff", fontWeight: "bold", padding: 4 }}
                    variant="titleLarge"
                  >
                    Training
                  </Text>
                  <Text
                    style={{
                      color: "#30333C",
                      fontWeight: "bold",
                      fontSize: 16,
                      padding: 4,
                    }}
                    variant="bodyMedium"
                  >
                    Let's Practice Your English
                  </Text>
                  <View style={styles.viewProgress}>
                    <Text
                      style={{
                        color: "#b1b4b5",
                        fontWeight: "bold",
                        padding: 4,
                      }}
                      variant="bodyMedium"
                    >
                      Train
                    </Text>
                    <ProgressBar
                      progress={0.7}
                      color="#38b6ff"
                      style={{ width: 40, height: 8, borderRadius: 20 }}
                      variant="bodyMedium"
                    />
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  saudacao: {
    marginVertical: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
    color: "#30333C",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#b1b4b5",
    width: "65%",
    textAlign: "center",
    fontWeight: "bold",
  },
  search: {
    padding: 25,
  },
  searchbar: {
    backgroundColor: "#ededed",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ededed",
    elevation: 2,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  studying: {
    padding: 25,
  },
  learn: {
    paddingTop: 10,
  },
  viewProgress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spacing: {
    marginRight: 25,
    marginBottom: 7,
    marginLeft: 2,
  },
});
