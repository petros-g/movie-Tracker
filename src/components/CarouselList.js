import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import React, {useMemo, useRef, useState} from "react";
import {Animated} from "react-native";
import FastImage from "react-native-fast-image";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import CarouselListItem from "./CarouselListItem";

const CarouselList = ({popularMovies, genres}) => {
  const {width} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <View style={StyleSheet.absoluteFillObject}>
        {popularMovies?.map((item, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              blurRadius={3}
              source={{
                uri: `https://image.tmdb.org/t/p/w300${item.poster}`,
              }}
              style={[StyleSheet.absoluteFillObject, {opacity, zIndex: -1}]}
            />
          );
        })}
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{alignItems: "center"}}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <CarouselListItem
              item={item}
              index={index}
              scrollX={scrollX}
              genres={genres}
            />
          );
        }}
        keyExtractor={item => item.id}
        data={popularMovies}
      />
    </>
  );
};

export default CarouselList;

const styles = StyleSheet.create({});
