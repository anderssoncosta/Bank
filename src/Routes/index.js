import React, { useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { AuthContext } from "../Contexts/auth";

import AuthRoutes from "./auth.routes";
import { AppRoutes } from "./app.routes";

export default function Routes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0F4FF",
        }}
      >
        <ActivityIndicator size="large" color="#131313" />
      </View>
    );
  }

  //     Logado ?  Tela de Login : Tela Inicial
  return signed ? <AppRoutes /> : <AuthRoutes />;
}
