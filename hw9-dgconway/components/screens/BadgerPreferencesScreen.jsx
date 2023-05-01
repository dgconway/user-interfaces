import BadgerPreferenceSwitch from "../BadgerPreferenceSwitch";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";
import { useContext } from "react";

function BadgerPreferencesScreen(props) {
  // map everything that is in the context to a BadgerPreferenceSwitch
  const [fav, setFav] = useContext(BadgerPreferencesContext);

  // use the handleToggle to update the context
  function updateFavorites(fav, keyword) {
    setFav((oldFav) => {
      // deep copy the original object
      let newFav = JSON.parse(JSON.stringify(oldFav));
      newFav[keyword] = !newFav[keyword];
      return newFav;
    });
  }

  return Object.keys(fav).map((keyword) => (
    <BadgerPreferenceSwitch
      key={keyword}
      initVal={fav[keyword]}
      prefName={keyword}
      handleToggle={() => updateFavorites(fav, keyword)}
    />
  ));
}

export default BadgerPreferencesScreen;
