import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Welcome } from "../pages/Welcome";
import { Platform, Keyboard } from "react-native";
import { MyWeighings } from "../pages/MyWeighings";
import { NewWeighingTitle } from "../pages/NewWeighingTitle";
import { NewWeighing } from "../pages/NewWeighing";

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {

  return (
    <AppTab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: colors.heading,
        tabBarActiveTintColor: colors.green,
        // tabBarLabelStyle: {
        //   color: colors.green,
        // },
        // tabBarIconStyle: {
        //   color: colors.green,
        // },
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          paddingVertical: Platform.OS == "ios" ? 20 : 0,
          height: 88,
          position: 'absolute',
        },
        headerShown: false,
      }}
    >
      <AppTab.Screen
        name="Minhas pesagens"
        component={MyWeighings}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="Nova pesagem"
        component={NewWeighing}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

export default AuthRoutes;
