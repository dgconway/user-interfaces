import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import { useState } from "react";

export default function App() {
  const [total, setTotal] = useState(0);
  const [input, setInput] = useState("");

  function handleClick() {
    // adapted from https://stackoverflow.com/questions/4966602/how-can-i-get-the-precision-of-a-decimal-in-js
    // we do some highly irritating parsing work here to avoid the issue of 1.2 + 2.4 = 3.599999999999999999999
    let totalPrecision = 0;
    if (total && total.includes(".")) {
      totalPrecision = total.split(".")[1].length;
    }
    let inputPrecision = 0;
    if (input && input.includes(".")) {
      inputPrecision = input.split(".")[1].length;
    }
    setTotal((prevTotal) =>
      (parseFloat(prevTotal) + parseFloat(input)).toFixed(
        Math.max(totalPrecision, inputPrecision)
      )
    );
    setInput();
  }

  function handleReset() {
    setTotal(0);
    setInput("");
    Alert.alert("Reset", "The total has been reset");
  }
  // adapted from https://reactnative.dev/docs/textinput
  return (
    <View style={styles.container}>
      <Text>Your total is {total ? total : 0}</Text>
      <TextInput
        style={styles.input}
        title="clickme"
        onChangeText={(text) => setInput(text)}
        value={input ? input + "" : ""}
        placeholder="Enter a value"
        keyboardType="numbers-and-punctuation"
      />
      <Button style={styles.button} title="Add" onPress={handleClick} />
      <Button title="Reset" onPress={handleReset} />
      <StatusBar style="auto" />
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
    minWidth: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
