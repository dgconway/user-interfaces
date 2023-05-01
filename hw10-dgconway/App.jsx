// Keep this here!
import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./components/screens/LoginScreen";

import { useEffect, useState } from "react";
import LandingScreen from "./components/screens/LandingScreen";
import ChatroomScreen from "./components/screens/ChatroomScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import CreatePostScreen from "./components/screens/CreatePostScreen";

import { Alert } from "react-native";

import * as SecureStore from "expo-secure-store";
import LogoutScreen from "./components/screens/LogoutScreen";
import ConversionScreen from "./components/screens/ConversionScreen";

const ChatDrawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [asGuest, setAsGuest] = useState(false);
  const [creatingPost, setCreatingPost] = useState([false, false]);
  const [messages, setMessages] = useState([]);

  function BreakSignal() {}

  const loadMessages = (name, setMessages) => {
    fetch(`https://cs571.org/s23/hw10/api/chatroom/${name}/messages`, {
      headers: {
        "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          return res.json();
        }
        throw new BreakSignal();
      })
      .then((json) => {
        setMessages(json.messages);
      })
      .catch(BreakSignal, function () {});
  };

  useEffect(() => {
    SecureStore.setItemAsync("mykey", "hello world");
    const result = SecureStore.getItemAsync("mykey");
    console.log("What?");
    console.log(typeof result);
    console.log(result);
  });

  useEffect(() => {
    fetch("https://cs571.org/s23/hw10/api/chatroom", {
      headers: {
        "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setChatrooms(json);
      });
  }, []);

  function handleLogin(username, password) {
    function BreakSignal() {}
    fetch(`https://cs571.org/s23/hw10/api/login/`, {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 404) {
          Alert.alert("Incorrect login credentials!");
          // adapted from https://stackoverflow.com/questions/28803287/how-to-break-promise-chain
          throw new BreakSignal();
        } else if (res.status === 200) {
          return res.json();
        }
        throw new BreakSignal();
      })
      .then((json) => {
        SecureStore.setItemAsync("credential", json.token);
        Alert.alert("Logged in successfully!");
        setAsGuest(false);
        setIsLoggedIn(true);
      })
      .catch(BreakSignal, function () {});
  }

  function handleSignup(username, password1, password2) {
    function BreakSignal() {}
    if (!username || !password1) {
      Alert.alert("You must provide both a username and password!");
    } else if (password1 !== password2) {
      Alert.alert("Your passwords do not match!");
    } else {
      fetch("https://cs571.org/s23/hw10/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
        },
        body: JSON.stringify({
          username: username,
          password: password1,
        }),
      })
        .then((res) => {
          if (res.status === 409) {
            Alert.alert("Signup failed", "That account already exists!");
            // adapted from https://stackoverflow.com/questions/28803287/how-to-break-promise-chain
            throw new BreakSignal();
          } else if (res.status === 200) {
            return res.json();
          }
          throw new BreakSignal();
        })
        .then((json) => {
          SecureStore.setItemAsync("credential", json.token);
          setAsGuest(false);
          setIsLoggedIn(true);
          Alert.alert("Signed up successfully!");
        })
        .catch(BreakSignal, function () {});
    }
  }
  if (isLoggedIn || asGuest) {
    // adapted from https://stackoverflow.com/questions/68808779/react-navigation-6-hide-drawer-item
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={LandingScreen} />
          {
            <ChatDrawer.Screen
              name="Post"
              options={{
                drawerItemStyle: {
                  display: "none",
                },
              }}
            >
              {(props) => (
                <CreatePostScreen
                  {...props}
                  setCreatingPost={setCreatingPost}
                  creatingPost={creatingPost}
                  loadMessages={loadMessages}
                  setMessages={setMessages}
                />
              )}
            </ChatDrawer.Screen>
          }
          {chatrooms.map((chatroom) => {
            return (
              <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => (
                  <ChatroomScreen
                    {...props}
                    name={chatroom}
                    isLoggedIn={isLoggedIn}
                    loadMessages={loadMessages}
                    setCreatingPost={setCreatingPost}
                    messages={messages}
                    setMessages={setMessages}
                  />
                )}
              </ChatDrawer.Screen>
            );
          })}
          {/*adapted from https://reactnavigation.org/docs/drawer-navigator/ */}
          {!asGuest ? (
            <ChatDrawer.Screen
              name="Logout"
              options={{ drawerItemStyle: { backgroundColor: "#ff7f7f" } }}
            >
              {() => (
                <LogoutScreen
                  setIsLoggedIn={setIsLoggedIn}
                  setAsGuest={setAsGuest}
                  setIsRegistering={setIsRegistering}
                />
              )}
            </ChatDrawer.Screen>
          ) : (
            <ChatDrawer.Screen
              name="Signup"
              options={{ drawerItemStyle: { backgroundColor: "#ff7f7f" } }}
            >
              {() => (
                <ConversionScreen
                  setIsLoggedIn={setIsLoggedIn}
                  setAsGuest={setAsGuest}
                  setIsRegistering={setIsRegistering}
                />
              )}
            </ChatDrawer.Screen>
          )}
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return (
      <RegisterScreen
        handleSignup={handleSignup}
        setIsRegistering={setIsRegistering}
      />
    );
  } else {
    return (
      <LoginScreen
        handleLogin={handleLogin}
        setIsRegistering={setIsRegistering}
        setAsGuest={setAsGuest}
      />
    );
  }
}
