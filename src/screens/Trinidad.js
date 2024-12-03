import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";

export default function Trinidad() {
  return (
    <View style={styles.container}>
      <View style={styles.viewTrinidad}>
        <Image
          style={styles.trinidade}
          source={require("../../assets/images/download.jpg")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Janira Campos Trinidad</Text>
          <Text style={styles.subtitle}>About:</Text>
          <Text style={styles.sub}>Teacher of Languages</Text>
        </View>
        <View style={styles.viewLangagues}>
          <View style={styles.textLangague}>
            <Image
              style={styles.langagues}
              source={require("../../assets/images/idiomas.png")}
            />
            <Text style={styles.sentence}>
              Which language will you master next?
            </Text>
          </View>

          <View style={styles.english}>
            <Text style={styles.subtitleText}>English</Text>
          </View>
          <View style={styles.spanish}>
            <Text style={styles.subtitleText}>Spanish</Text>
          </View>
          <View style={styles.portuguese}>
            <Text style={styles.subtitleText}>Portuguese</Text>
          </View>
          <View style={styles.english}>
            <Text style={styles.subtitleText}>English</Text>
          </View>
          <View style={styles.spanish}>
            <Text style={styles.subtitleText}>Spanish</Text>
          </View>
          <View style={styles.portuguese}>
            <Text style={styles.subtitleText}>Portuguese</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38b6ff",
  },
  viewTrinidad: {
    marginBottom: 55,
    marginTop: 60,
    alignItems: "center",
  },
  trinidade: {
    borderRadius: 100,
    width: 150,
    height: 150,
  },
  scrollContainer: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textContainer: {
    width: "100%",
    alignItems: "flex-start",
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6b6c6e",
  },
  subtitle: {
    color: "#6b6c6e",
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 5,
  },
  sub: {
    color: "#989a9c",
    // fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
  },
  langagues: {
    width: 80,
    height: 80,
  },
  viewLangagues: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  textLangague: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 25,
  },
  sentence: {
    fontSize: 18,

    marginHorizontal: 10,
    flexWrap: "wrap",
    width: "70%",
    color: "#6b6c6e",
    fontWeight: "bold",
  },
  english: {
    backgroundColor: "#ADD8E6",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    width: "50%",
  },
  spanish: {
    backgroundColor: "#FFE4B5",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    width: "50%",
  },
  portuguese: {
    backgroundColor: "#98FB98",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    width: "50%",
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333", // Texto escuro para contraste
  },
});
