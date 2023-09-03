import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import Home from "../Pages/Home";

const Drawer = createDrawerNavigator();

export function AppRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
          headerShown: false,
          drawerStyle:{
            backgroundColor: '#FFF',
            paddingTop: 20
          },
          drawerActiveBackgroundColor: '#3b3dbf', // Cor do fundo drawer
          drawerActiveTintColor: '#FFF', // Cor da fonte do drawer
          drawerInactiveBackgroundColor: '#F0F2FF', // Cor do fundo drawer quando não selecionado
          drawerInactiveTintColor: '#121212' // Cor da fonte do drawer quando não selecionado
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}
