import { useEffect, useState } from "react";
import { Text, View, Button, Alert } from "react-native";
import BadgerBakedGood from "./BadgerBakedGood";
import BakeryOrderContext from "../contexts/BakeryOrderContext";
import TotalCostContext from "../contexts/TotalCostContext";

export default function BadgerBakery() {
  // STATE STATE STATE STATE
  const [items, setItems] = useState([]);
  const [whichPastery, setWhichPastery] = useState(0);
  const [bakeryOrders, setBakeryOrders] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  function placeOrder() {
    let nonzeroNumbItems = false;
    for (const i of Object.values(bakeryOrders)) {
      if (i != 0) {
        nonzeroNumbItems = true;
        break;
      }
    }
    if (!nonzeroNumbItems) {
      Alert.alert(
        "Empty Basket",
        "Yo, your basket is like, total empty dude. Kindly add something to yo shopping cart before checking out, m'kay?"
      );
    } else {
      fetch(`https://www.cs571.org/s23/hw8/api/bakery/order`, {
        method: "POST",
        headers: {
          "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bakeryOrders),
      }).then((res) => {
        if (res.status === 200) {
          Alert.alert(
            "Success",
            "Ay, like, yo order was totally successful, dude"
          );
          setBakeryOrders((old) => {
            let newData = { ...old };
            for (i of Object.keys(newData)) {
              newData[i] = 0;
            }
            return newData;
          });
          setTotalCost(0);
        } else {
          Alert.alert(
            "Error",
            "Something went wrong. Fear not, our highly skilled development team is already scrutinizing this issue and will have a fix post-haste"
          );
        }
      });
    }
  }

  useEffect(() => {
    fetch(`https://www.cs571.org/s23/hw8/api/bakery/items`, {
      headers: {
        "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const pasteries = Object.keys(json);
        const organizedPasteries = [];
        let counter = 0;

        // adapted from https://stackoverflow.com/questions/42974735/create-object-from-array
        let curBakeryOrders = {};
        for (const i of pasteries) {
          organizedPasteries.push({ i, ...json[i], counter });
          counter += 1;
          curBakeryOrders[i] = 0;
        }
        setItems(organizedPasteries);
        setBakeryOrders(curBakeryOrders);
      });
  }, []);

  return (
    <View>
      <BakeryOrderContext.Provider value={[bakeryOrders, setBakeryOrders]}>
        <Text>Welcome to Badger Bakery!</Text>
        <TotalCostContext.Provider value={[totalCost, setTotalCost]}>
          {items && items[whichPastery] && (
            <>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Button
                  title="Previous"
                  disabled={items[whichPastery].counter === 0}
                  onPress={() => setWhichPastery((prev) => prev - 1)}
                />
                <Button
                  title="Next"
                  disabled={items[whichPastery].counter === items.length - 1}
                  onPress={() => setWhichPastery((prev) => prev + 1)}
                />
              </View>
              <BadgerBakedGood
                key={items[whichPastery].i}
                id={items[whichPastery].i}
                img={items[whichPastery].img}
                price={items[whichPastery].price}
                upperBound={items[whichPastery].upperBound}
              />
            </>
          )}
          <Text style={{ alignSelf: "center" }}>
            Your total is ${totalCost.toFixed(2)}
          </Text>
          <Button
            style={{ alignSelf: "center" }}
            title="Place Order"
            onPress={placeOrder}
          />
        </TotalCostContext.Provider>
      </BakeryOrderContext.Provider>
    </View>
  );
}
