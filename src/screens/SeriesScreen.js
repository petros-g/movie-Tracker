import React from "react";
import {StyleSheet, View} from "react-native";
import MainListsItem from "../components/MainListsItem";

export default function SeriesScreen() {
  return (
    <View style={styles.container}>
      <MainListsItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
  },
});
