import { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

function RegisterScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pass2, setPass2] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
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
      <Text>Confirm Password</Text>
      <TextInput style={styles.input} onChangeText={setPass2} secureTextEntry>
        {pass2}
      </TextInput>
      <Button
        color="crimson"
        title="Signup"
        onPress={() => props.handleSignup(username, password, pass2)}
      />
      <Button
        color="grey"
        title="Nevermind!"
        onPress={() => props.setIsRegistering(false)}
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

export default RegisterScreen;
