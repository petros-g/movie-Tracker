import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "@rneui/themed";

export default function WatchlistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watchlist</Text>
      <View
        style={{flexDirection: "row", justifyContent: "space-around", flex: 1}}>
        <Button type="outline" buttonStyle={styles.buttons}>
          Movies
        </Button>
        <Button type="outline" buttonStyle={styles.buttons}>
          Series
        </Button>
      </View>
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
