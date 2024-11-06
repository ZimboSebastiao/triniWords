import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "../screens/Home";
import SearchScreen from "../screens/SearchScreen";
import DicionaryScreen from "../screens/DicionaryScreen";
import Chatbot from "../screens/Chatbot";
import SettingsScreen from "../screens/SettingsScreen";
import LearnScreen from "../screens/LearnScreen";
import Splash from "./src/screens/Splash";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#EDEFF0",
          borderTopColor: "#EDEFF0",
          height: 55,
        },
        tabBarActiveTintColor: "#3BB3BD",
        tabBarInactiveTintColor: "#b1b4b5",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={35} />
          ),
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="LearnScreen"
        component={LearnScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={35} />
          ),
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="DicionaryScreen"
        component={DicionaryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-open-page-variant"
              color={color}
              size={35}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Chatbot"
        component={Chatbot}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={35} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
