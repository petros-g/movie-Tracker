import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {FlatList} from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";

const SimpleDropList = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({item}) => (
          <View style={{flex: 1, height: 180}}>
            <FastImage
              style={styles.image}
              resizeMode={FastImage.resizeMode.contain}
              source={{
                uri: `https://image.tmdb.org/t/p/w200${item.poster}`,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default SimpleDropList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
  },
  image: {
    height: 180,
  },
});
