import { Button, StyleSheet, Text, View } from "react-native";

function ConversionScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginTop: -100 }}>Ready to signup?</Text>
      <Text>Join BadgerChat to be able to make posts!</Text>
      <Text />
      <Button
        title="Signup!"
        color="darkred"
        onPress={() => {
          props.setIsLoggedIn(false);
          props.setAsGuest(false);
          props.setIsRegistering(true);
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
});

export default ConversionScreen;
