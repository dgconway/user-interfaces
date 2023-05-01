import { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

function CreatePostScreen(props) {
  function BreakSignal() {}
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  function sendPost() {
    SecureStore.getItemAsync("credential").then((result) => {
      fetch(
        `https://cs571.org/s23/hw10/api/chatroom/${props.creatingPost[1]}/messages`,
        {
          method: "POST",
          headers: {
            "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
            "Content-Type": "application/json",
            Authorization: `Bearer ${result}`,
          },
          body: JSON.stringify({
            title: header,
            content: body,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          Alert.alert(json.msg);
        })
        .then(() => props.setCreatingPost([false, false]))
        .then(() => props.navigation.jumpTo(props.creatingPost[1]))
        .then(() =>
          props.loadMessages(props.creatingPost[1], props.setMessages)
        )
        .catch(BreakSignal, function () {});
    });
  }
  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput style={styles.input} onChangeText={setHeader}>
        {header}
      </TextInput>
      <Text>Body</Text>
      <TextInput style={styles.input} onChangeText={setBody}>
        {body}
      </TextInput>
      <Text />
      <Button
        title="Create Post!"
        color="darkred"
        onPress={() => {
          sendPost();
          // .then(() => props.setCreatingPost([false, false]))
          // .then(() => props.navigation.jumpTo(props.creatingPost[1]))
          // .then(() => props.loadMessages(props.creatingPost[1]));
          // props.setCreatingPost([false, false]);
          // props.navigation.jumpTo(props.creatingPost[1]);
          // props.loadMessages(props.creatingPost[1]);
        }}
      />
      <Button
        title="Cancel"
        color="grey"
        onPress={() => {
          props.setCreatingPost([false, false]);
        }}
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

export default CreatePostScreen;
