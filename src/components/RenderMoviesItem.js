import {useNavigation} from "@react-navigation/native";
import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";

const RenderMoviesItem = ({item, index, data}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Carousel", {data: {index, data}})}
        style={styles.touchableOp}>
        <FastImage
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RenderMoviesItem;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  item: {marginVertical: 10, width: 200},
  touchableOp: {padding: 5},
});
