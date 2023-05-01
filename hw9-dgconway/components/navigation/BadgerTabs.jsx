import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";

const NewsTabs = createBottomTabNavigator();

function BadgerTabs(props) {
  return (
    <>
      <NewsTabs.Navigator>
        <NewsTabs.Screen name="News" component={BadgerNewsScreen} />
        <NewsTabs.Screen
          name="Preferences"
          component={BadgerPreferencesScreen}
        />
      </NewsTabs.Navigator>
    </>
  );
}

export default BadgerTabs;
