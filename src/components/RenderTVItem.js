import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";

const RenderTVItem = ({item, index}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Carousel", {index, type: "series"})}
        style={styles.touchableOp}>
        <Image
          resizeMode="center"
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RenderTVItem;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  item: {marginVertical: 10, width: 200},
  touchableOp: {padding: 5},
  title: {
    fontSize: 18,
    alignSelf: "center",
    color: "black",
    fontWeight: "700",
  },
  text: {
    alignSelf: "center",
    fontSize: 13,
    color: "black",
  },
});
