import { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BadgerNewsItemCard from "../BadgerNewsItemCard";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";
import { Text } from "react-native";

function BadgerNewsScreen(props) {
  const [articleSummaries, setArticleSummaries] = useState([]);
  const [fav, setFav] = useContext(BadgerPreferencesContext);

  useEffect(() => {
    fetch(`https://www.cs571.org/s23/hw9/api/news/articles`, {
      headers: {
        "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setArticleSummaries(json);
        const tags = json.reduce(
          (prevVal, curVal) => [...prevVal, ...curVal.tags],
          []
        );

        // adapted from https://www.geeksforgeeks.org/sets-in-javascript/
        const unique_set_tags = new Set(tags);

        // adapted from https://www.geeksforgeeks.org/how-to-convert-set-to-array-in-javascript/
        unique_tags = Array.from(unique_set_tags);

        let myContextVar = {};
        for (let i = 0; i < unique_tags.length; i++) {
          myContextVar[unique_tags[i]] = true;
        }
        setFav(myContextVar);
      });
  }, []);

  filteredArticles = articleSummaries.filter((item) => {
    for (let i = 0; i < item.tags.length; i++) {
      if (!fav[item.tags[i]]) {
        return false;
      }
    }
    return true;
  });
  return (
    <ScrollView>
      {filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <BadgerNewsItemCard
            key={article.id}
            id={article.id}
            img={article.img}
            title={article.title}
          />
        ))
      ) : (
        <Text style={{ alignSelf: "center", fontSize: 25 }}>
          Try adding some topics in the "Preferences" menu!
        </Text>
      )}
    </ScrollView>
  );
}

export default BadgerNewsScreen;
