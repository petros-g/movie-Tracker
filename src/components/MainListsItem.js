import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import SearchBarItem from "./SearchBarItem";
import CarouselList from "./CarouselList";
import SimpleDropList from "./SimpleDropList";
import {useDispatch, useSelector} from "react-redux";
import {getGenres, getPopularMovies} from "../redux/slices/moviesSlice";
import {getPopularSeries} from "../redux/slices/seriesSlice";

export default function MainListsItem({type}) {
  const dispatch = useDispatch();
  const [changeLayout, setChangeLayout] = useState(false);
  const state = useSelector(state => state);

  useEffect(() => {
    if (type === "movie") {
      dispatch(getPopularMovies());
    } else {
      dispatch(getPopularSeries());
    }
    dispatch(getGenres());
  }, [dispatch, type]);

  const onChangeCategory = category => {
    dispatch(getPopularMovies(category)); //to fix
  };

  const data =
    type === "movie"
      ? state?.moviesSlice.moviesCurrent
      : state?.seriesSlice.seriesCurrent;

  return (
    <>
      <SearchBarItem
        setChangeLayout={setChangeLayout}
        onChangeCategory={onChangeCategory}
      />
      {changeLayout ? (
        <CarouselList data={data} />
      ) : (
        <SimpleDropList data={data} type={type} />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
