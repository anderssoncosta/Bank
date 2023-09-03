import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";

import {
  AreaInput,
  Background,
  Container,
  Input,
  Link,
  LinkText,
  Logo,
  SubmitButton,
  SubmitText,
} from "./styled";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Contexts/auth";

const SignIn = () => {
  const navigation = useNavigation();
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signIn(email, password);
  };

  return (
    <Background>
      <Container
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <Logo source={require("../../Assets/Logo.png")} />

        <AreaInput>
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
          />
        </AreaInput>
        <AreaInput>
          <Input
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            placeholder="Senha"
          />
        </AreaInput>

        <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Acessar</SubmitText>
          )}
        </SubmitButton>
        <Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Criar uma conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
};

export default SignIn;
