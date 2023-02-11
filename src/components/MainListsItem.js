import React, {useCallback, useEffect, useState} from "react";
import {StyleSheet} from "react-native";
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
