import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Search, BookText, Settings, MessageCircle } from "lucide-react-native";

import Home from "./src/screens/Home";
import SettingsScreen from "./src/screens/SettingsScreen";
import SearchScreen from "./src/screens/SearchScreen";
import Chatbot from "./src/screens/Chatbot";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#EDEFF0",
            borderTopColor: "#EDEFF0",
            height: "7%",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: () => <BookText color="#3BB3BD" />,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#ff80c3",
            tabBarInactiveTintColor: "#ffff",
            // tabBarStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => <Search color="#3BB3BD" />,
            tabBarShowLabel: false,
            // tabBarActiveColor: "#ff80c3",
            tabBarInactiveTintColor: "#ffff",
          }}
        />
        <Tab.Screen
          name="Chatbot"
          component={Chatbot}
          options={{
            headerShown: false,
            tabBarIcon: () => <MessageCircle color="#3BB3BD" />,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#ff80c3",
            tabBarInactiveTintColor: "#ffff",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => <Settings color="#3BB3BD" />,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#ff80c3",
            tabBarInactiveTintColor: "#ffff",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFF0",
    alignItems: "center",
    justifyContent: "center",
  },
});
