import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";

const AuthStack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false, //headerShown retira o titulo da navegação do tipo stack
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: "#3b3dbf",
            borderBottonWidth: 1,
            borderBottonColor: "#00b94a",
          },
          headerTintColor: '#FFF',
          headerTitle: 'Voltar',
          headerBackTitleVisible: false
        }}
      />
    </AuthStack.Navigator>
  );
}
