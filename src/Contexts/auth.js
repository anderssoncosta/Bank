import React, { createContext, useEffect, useState } from "react";

import api from "../Services/api";

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); //informações do usuário autenticado
  const [loadingAuth, setLoadingAuth] = useState(false); //estado de carregamento da autenticação
  const [loading, setLoading] = useState(true); //estado de carregamento geral

  const navigation = useNavigation();

  // Conexão com a API
  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("@finToken");

      if (storageUser) {
        const response = await api
          .get("/me", {
            headers: {
              Authorization: `Bearer ${storageUser}`,
            },
          })
          .catch(() => {
            setUser(null);
          });

        api.defaults.headers["Authorization"] = `Bearer ${storageUser}`;
        setUser(response.data);
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);


  // Cadastro de usuário
  async function signUp(email, password, nome) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/users", {
        name: nome,
        password: password,
        email: email,
      });
      setLoadingAuth(false);
      navigation.goBack();
    } catch (error) {
      console.log(`Erro ao Cadastrar, ${error}`);
      setLoadingAuth(false);
    }
  }

  //funcao de Login
  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      const { id, name, token } = response.data;

      const data = {
        id,
        name,
        token,
        email,
      };

      await AsyncStorage.setItem("@finToken", token);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
      });

      setLoadingAuth(false);
    } catch (error) {
      console.log(`Não foi possível efetuar o login, ${error}`);
      setLoadingAuth(false);
    }
  }

  // Função para deslogar
  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signUp, signIn, signOut, loadingAuth, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
