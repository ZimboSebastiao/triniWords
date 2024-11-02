import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "../screens/Home";
import SearchScreen from "../screens/SearchScreen";
import DicionaryScreen from "../screens/DicionaryScreen";
import Chatbot from "../screens/Chatbot";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
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
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Dicionary"
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
      <Tab.Screen
        name="Chatbot"
        component={Chatbot}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
