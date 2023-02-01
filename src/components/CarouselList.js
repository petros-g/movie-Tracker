import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useMemo, useRef} from "react";
import {Animated, StyleSheet, useWindowDimensions, View} from "react-native";
import {useSelector} from "react-redux";
import CarouselListItem from "./CarouselListItem";

const CarouselList = ({popularMovies}) => {
  const {genres} = useSelector(state => state.moviesSlice);
  const {width} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const tabIndex = navigation.getState().index;

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
              genres={genres}
              tabIndex={tabIndex}
              item={item}
              index={index}
              scrollX={scrollX}
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
