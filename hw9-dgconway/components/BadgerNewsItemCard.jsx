import {
  View,
  Image,
  Text,
  Button,
  Pressable,
  Modal,
  Animated,
  ScrollView,
} from "react-native";
import { useState, useRef } from "react";

function BadgerNewsItemCard(props) {
  const fadeArticleIn = useRef(new Animated.Value(0)).current;

  const [modalText, setModalText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  function getText() {
    fetch(`https://www.cs571.org/s23/hw9/api/news/articles/${props.id}`, {
      headers: {
        "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setModalText(json);
        // we can useNativeDriver because it is just opacity here
        Animated.timing(fadeArticleIn, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start();
      });
  }

  // adapted from https://reactnative.dev/docs/modal
  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalOpen}
        onShow={getText}
        onRequestClose={() => setModalOpen(false)}
      >
        <ScrollView style={{ margin: 20 }}>
          <Text></Text>
          <Text></Text>
          <Text style={{ fontSize: 25, alignSelf: "center" }}>Article</Text>
          <Text style={{ alignSelf: "center" }}>{props.title}</Text>
          <Image
            style={{ width: 300, height: 300, alignSelf: "center" }}
            source={{ uri: props.img }}
          ></Image>

          {modalText ? (
            <Animated.Text style={{ opacity: fadeArticleIn }}>
              {modalText.body}
            </Animated.Text>
          ) : (
            <Text>Loading...</Text>
          )}

          <Button title="Close" onPress={() => setModalOpen(false)}></Button>
        </ScrollView>
      </Modal>
      <Pressable onPress={() => setModalOpen(true)}>
        <Image
          style={{ width: 300, height: 300, alignSelf: "center" }}
          source={{ uri: props.img }}
        ></Image>
        <Text
          style={{
            alignSelf: "center",
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 40,
          }}
        >
          {props.title}
        </Text>
      </Pressable>
    </View>
  );
}

export default BadgerNewsItemCard;
