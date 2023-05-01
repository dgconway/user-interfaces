import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";

function LoginScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // adapted from https://reactnative.dev/docs/textinput
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
      <Text>Username</Text>
      <TextInput style={styles.input} onChangeText={setUsername}>
        {username}
      </TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry
      >
        {password}
      </TextInput>
      <Button
        color="crimson"
        title="Login"
        onPress={() => {
          props.handleLogin(username, password);
        }}
      />
      <Text />
      <Text>New around here? Join the Badger Cult! I mean - Badger Chat!</Text>
      <Button
        color="blue"
        title="Continue as Guest"
        onPress={() => props.setAsGuest(true)}
      />
      <Button
        color="grey"
        title="Signup"
        onPress={() => props.setIsRegistering(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    minWidth: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
