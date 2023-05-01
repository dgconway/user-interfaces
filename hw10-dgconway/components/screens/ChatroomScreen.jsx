import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Button, Alert } from "react-native";
import ChatMessage from "../ChatMessage";

function ChatroomScreen(props) {
  useEffect(() => {
    props.loadMessages(props.name, props.setMessages);
  }, [props.name]);
  return (
    <ScrollView style={{ flex: 1 }}>
      {/*Guest users should be able to see but not create posts */}
      {props.isLoggedIn && (
        <Button
          title="Create post"
          color="darkred"
          onPress={() => {
            props.setCreatingPost([true, props.name]);
            props.navigation.jumpTo("Post");
          }}
        />
      )}
      <Button
        title="Refresh"
        color="grey"
        onPress={() => {
          props.loadMessages(props.name, props.setMessages);
          Alert.alert("Posts refreshed!");
        }}
      />
      {props.messages.map((msg) => {
        return (
          <ChatMessage
            key={msg.id}
            title={msg.title}
            poster={msg.poster}
            created={msg.created}
            content={msg.content}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatroomScreen;
