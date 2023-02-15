import {Chip, Text} from "@rneui/themed";
import React, {useCallback, useEffect, useState} from "react";
import {TouchableOpacity} from "react-native";
import {ScrollView, StyleSheet, View} from "react-native";
import FastImage from "react-native-fast-image";

import {useDispatch, useSelector} from "react-redux";
import {
  getDetailsData,
  setDetailModalVisible,
} from "../redux/slices/detailsSlice";
import {
  getGenres,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../redux/slices/moviesSlice";
import {
  getPopularSeries,
  getTopRatedSeries,
  getUpcomingSeries,
} from "../redux/slices/seriesSlice";
import CarouselList from "./Carousel/CarouselList";
import SearchBarItem from "./SearchBarItem";
import SimpleDropList from "./SimpleDropList";

export default function MainListsItem({type}) {
  const dispatch = useDispatch();
  const [changeLayout, setChangeLayout] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const state = useSelector(res => res);

  const onChangeCategory = useCallback(
    category => {
      switch (category) {
        case 0:
          type
            ? dispatch(getPopularMovies(category))
            : dispatch(getPopularSeries(category));
          break;
        case 1:
          type
            ? dispatch(getUpcomingMovies(category))
            : dispatch(getUpcomingSeries(category));
          break;
        case 2:
          type
            ? dispatch(getTopRatedMovies(category))
            : dispatch(getTopRatedSeries(category));
          break;
        default:
          break;
      }
    },
    [dispatch, type],
  );

  const data =
    type === "movie"
      ? state?.moviesSlice.moviesCurrent
      : state?.seriesSlice.seriesCurrent;

  const onOpenModal = (id, type) => {
    dispatch(setDetailModalVisible(true));
    dispatch(getDetailsData({id: id, type}));
  };

  return (
    <>
      <SearchBarItem
        type={type}
        setChangeLayout={setChangeLayout}
        onChangeCategory={onChangeCategory}
        setIsSearching={setIsSearching}
      />
      {isSearching ? (
        <View
          style={{
            backgroundColor: "#18181c",
            flex: 1,
          }}>
          <ScrollView>
            {state?.moviesSlice?.searchResults?.map(item => {
              return (
                <TouchableOpacity
                  key={item?.id}
                  onPress={() => onOpenModal(item?.id, item?.type)}
                  style={{
                    padding: 10,
                    flexDirection: "row",

                    flex: 1,
                    margin: 0,
                  }}>
                  <FastImage
                    style={{height: 180, width: 120}}
                    resizeMode={FastImage.resizeMode.contain}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w200${item.poster}`,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      justifyContent: "space-evenly",
                    }}>
                    <Text
                      style={{
                        color: "white",

                        fontWeight: "bold",
                        fontSize: 20,
                      }}>
                      {item.title}{" "}
                      <Text style={{color: "gray", fontSize: 15}}>
                        ({item.type})
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                      }}>
                      {item?.rating?.toFixed(1)}⭐
                    </Text>
                    <Chip
                      title={item?.release?.slice(0, 4)}
                      size="sm"
                      icon={{
                        name: "calendar",
                        type: "font-awesome",
                        size: 15,
                        color: "white",
                      }}
                      raised
                      color={"#292b30"}
                      buttonStyle={{elevation: 8}}
                      containerStyle={{
                        alignSelf: "flex-start",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : changeLayout ? (
        <CarouselList data={data} />
      ) : (
        <SimpleDropList data={data} type={type} />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
