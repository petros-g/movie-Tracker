import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useMemo, useRef} from "react";
import {Animated, StyleSheet, useWindowDimensions, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {
  getDetailsData,
  setDetailModalVisible,
} from "../../redux/slices/detailsSlice";
import {
  getVideoData,
  setIsVideoModalVisible,
} from "../../redux/slices/videoSlice";
import CarouselListItem from "./CarouselListItem";

const CarouselList = ({data}) => {
  const dispatch = useDispatch();
  const {genres} = useSelector(state => state.moviesSlice);
  const {width} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const onOpenDetailModal = id => {
    const tabIndex = navigation.getState().index;
    const type = tabIndex === 0 ? "movie" : "tv";
    dispatch(setDetailModalVisible(true));
    dispatch(getDetailsData({id: id, type}));
  };

  const onOpenVideoModal = id => {
    const tabIndex = navigation.getState().index;
    const type = tabIndex === 0 ? "movie" : "tv";
    dispatch(setIsVideoModalVisible(true));
    dispatch(getVideoData({id, type}));
  };
  return (
    <>
      <View style={StyleSheet.absoluteFillObject}>
        {data?.map((item, index) => {
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
              key={`image-${item?.id}`}
              blurRadius={5}
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
              item={item}
              index={index}
              scrollX={scrollX}
              onOpenDetailModal={onOpenDetailModal}
              onOpenVideoModal={onOpenVideoModal}
            />
          );
        }}
        keyExtractor={(item, index) => item?.id.toString()}
        data={data}
      />
    </>
  );
};

export default CarouselList;

const styles = StyleSheet.create({});
