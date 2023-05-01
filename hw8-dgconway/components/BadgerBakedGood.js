import { Text, View, Image, Button } from "react-native";
import { useContext } from "react";
import BakeryOrderContext from "../contexts/BakeryOrderContext";
import TotalCostContext from "../contexts/TotalCostContext";

export default function BadgerBakedGood(props) {
  const [bakeryOrders, setBakeryOrders] = useContext(BakeryOrderContext);
  const [totalCost, setTotalCost] = useContext(TotalCostContext);

  function handleAugment() {
    setBakeryOrders((old) => {
      let newData = { ...old };
      newData[props.id] = newData[props.id] + 1;
      return newData;
    });
    setTotalCost((oldCost) => oldCost + props.price);
  }

  function handleDecrement() {
    setBakeryOrders((old) => {
      let newData = { ...old };
      newData[props.id] = newData[props.id] - 1;
      return newData;
    });
    setTotalCost((oldCost) => oldCost - props.price);
  }

  // adapted from https://stackoverflow.com/questions/52759354/how-to-place-two-buttons-within-the-same-row-in-react-native
  return (
    <View>
      <Image
        style={{ width: 200, height: 200, alignSelf: "center" }}
        source={{ uri: props.img }}
      ></Image>
      <Text style={{ alignSelf: "center" }}>{props.id}</Text>
      <Text style={{ alignSelf: "center" }}>${props.price.toFixed(2)}</Text>
      <Text style={{ alignSelf: "center" }}>
        You can order up to {props.upperBound} units!
      </Text>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Button
          title="-"
          disabled={bakeryOrders[props.id] === 0}
          onPress={handleDecrement}
        />
        <Text style={{ alignSelf: "center" }}>{bakeryOrders[props.id]}</Text>
        <Button
          title="+"
          disabled={bakeryOrders[props.id] === props.upperBound}
          onPress={handleAugment}
        />
      </View>
    </View>
  );
}
