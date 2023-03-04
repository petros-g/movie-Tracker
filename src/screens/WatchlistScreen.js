import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {Button} from "@rneui/themed";
import {useSelector} from "react-redux";
import {Spacer} from "../components/Spacer";
import {useState} from "react";
import SearchViewContent from "../components/SearchViewContent";

export default function WatchlistScreen() {
  const {watchlist} = useSelector(state => state.watchlistSlice);
  const [isMoviesFocused, setIsMoviesFocused] = useState(true);

  //splitting watchlist into two arrays, movies and series
  const [movies, series] = watchlist?.reduce(
    ([movies, series], elem) => {
      if (!elem.type) {
        return [[...movies, elem], series];
      } else {
        return [movies, [...series, elem]];
      }
    },
    [[], []],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watchlist</Text>
      <View style={{flexDirection: "row", justifyContent: "space-around"}}>
        <Button
          onPress={() => setIsMoviesFocused(true)}
          type="outline"
          buttonStyle={styles.buttons}>
          Movies
        </Button>
        <Button
          onPress={() => setIsMoviesFocused(false)}
          type="outline"
          buttonStyle={styles.buttons}>
          Series
        </Button>
      </View>
      <Spacer height={16} />
      <SearchViewContent data={isMoviesFocused ? movies : series} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "800",
    padding: 20,
  },
  buttons: {
    borderWidth: 1,
    borderRadius: 20,
  },
});
