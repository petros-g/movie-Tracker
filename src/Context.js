import React, {useContext, useState} from "react";
import {StyleSheet} from "react-native";
import {fetchPopularMovies, fetchPopularSeries} from "./api/apiFunctions";

const Context = React.createContext();

export function useData() {
  return useContext(Context);
}

export function ContextProvider({children}) {
  const [popularMovies, setPopularMovies] = useState();
  const [popularSeries, setPopularSeries] = useState();
  const [movieGenres, setMovieGenres] = useState();
  const [seriesGenres, setSeriesGenres] = useState();

  const values = {
    popularMovies,
    popularSeries,
    movieGenres,
    seriesGenres,
    setPopularMovies,
    setSeriesGenres,
    setPopularSeries,
    setMovieGenres,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
}

const styles = StyleSheet.create({});
