import {Text} from "@rneui/themed";
import React, {useCallback, useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";

import {useDispatch, useSelector} from "react-redux";
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

  useEffect(() => {
    if (type === "movie") {
      dispatch(getPopularMovies());
    } else {
      dispatch(getPopularSeries());
    }
  }, [dispatch, type]);

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
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
          }}>
          <ScrollView>
            {state?.moviesSlice?.searchResults?.map(item => {
              return (
                <View style={{borderWidth: 1, padding: 30}}>
                  <Text style={{color: "black"}}>{item.title}</Text>
                </View>
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
