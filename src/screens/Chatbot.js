import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Ionicons";
import { sendMessageToChatGemini } from "../apis/gemini";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage = newMessages[0].text;

    setIsTyping(true);

    try {
      const botResponse = await sendMessageToChatGemini(userMessage);

      const botMessage = {
        _id: Math.random().toString(),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "AI Health",
          avatar: require("../../assets/images/bot1.jpg"),
        },
      };

      setTimeout(() => {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      const errorMessage = {
        _id: Math.random().toString(),
        text: "Limite de requisições da API excedido. Tente novamente mais tarde.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "SkinBot",
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, errorMessage)
      );
      setIsTyping(false);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#fff",
          },
          right: {
            backgroundColor: "#3BB3BD",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginBottom: 11 }}>
          <Icon name="send" size={24} color="#0075FD" />
        </View>
      </Send>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 16,
          backgroundColor: "#fff",
          marginHorizontal: 8,
          margin: 10,
          borderTopWidth: 0,
        }}
      />
    );
  };

  return (
    <View style={styles.chatContainer}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        placeholder="How can I help you today?"
        placeholderTextColor="#5e5f61"
        isTyping={isTyping}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: "#EDEFF0",
  },
  inputContainer: {
    backgroundColor: "transparent",
    overflow: "hidden",
    backgroundColor: "#ffff",
    margin: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 14,
  },
  sendText: {
    color: "#007aff",
    fontWeight: "bold",
  },
  errorMessage: {
    backgroundColor: "#ffdddd",
    color: "red",
  },
  alertText: {
    color: "#a6a2a2",
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});
