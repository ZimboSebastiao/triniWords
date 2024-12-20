import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";
import { Modal, Portal, Button, PaperProvider } from "react-native-paper";

export default function Trinidad() {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  };

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir o link:", err)
    );
  };

  return (
    <PaperProvider>
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
            <View style={styles.viewFollow}>
              <Text style={styles.sub}>Teacher of Languages</Text>
              <Pressable style={styles.followBotao} onPress={showModal}>
                <Text style={styles.followText}>Follow</Text>
              </Pressable>
            </View>
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
          </View>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <Pressable
                style={styles.socialMidia}
                onPress={() =>
                  handlePress("https://linkedin.com/in/janiracampotrinidad")
                }
              >
                <Image
                  style={styles.social}
                  source={require("../../assets/images/linkedin.png")}
                />
                <Text style={styles.subtitleFollow}>Linkedin</Text>
              </Pressable>

              <Pressable
                style={styles.socialMidia}
                onPress={() =>
                  handlePress(
                    "https://www.instagram.com/janira.linguaecultura/"
                  )
                }
              >
                <Image
                  style={styles.social}
                  source={require("../../assets/images/instagram.png")}
                />
                <Text style={styles.subtitleFollow}>instagram</Text>
              </Pressable>

              <Pressable
                style={styles.socialMidia}
                onPress={() =>
                  handlePress("https://medium.com/@janira.ctrinidad")
                }
              >
                <Image
                  style={styles.social}
                  source={require("../../assets/images/m.png")}
                />
                <Text style={styles.subtitleFollow}>Medium</Text>
              </Pressable>

              <Pressable
                style={styles.socialMidia}
                onPress={() =>
                  handlePress(
                    "https://docs.google.com/presentation/d/1ZvdWNTiEEgQNZfIAt4W7pBjqkeuUWT50TCSh4t7_-ic/edit#slide=id.p"
                  )
                }
              >
                <Image
                  style={styles.social}
                  source={require("../../assets/images/t.png")}
                />
                <Text style={styles.subtitleFollow}>Portfolio</Text>
              </Pressable>
            </Modal>
          </Portal>
        </ScrollView>
      </View>
    </PaperProvider>
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
    color: "#333",
  },
  viewFollow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  followText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  followBotao: {
    backgroundColor: "#38b6ff",
    padding: 3,
    width: "28%",
    borderRadius: 10,
  },
  socialMidia: {
    backgroundColor: "#ADD8E6",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    width: "70%",
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
  },
  social: {
    width: 30,
    height: 30,
  },
  subtitleFollow: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    paddingLeft: 20,
  },
});
