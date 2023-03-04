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
import SearchViewContent from "./SearchViewContent";
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

  return (
    <>
      <SearchBarItem
        type={type}
        setChangeLayout={setChangeLayout}
        onChangeCategory={onChangeCategory}
        setIsSearching={setIsSearching}
      />
      {isSearching ? (
        <SearchViewContent state={state} />
      ) : changeLayout ? (
        <CarouselList data={data} />
      ) : (
        <SimpleDropList data={data} type={type} />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
