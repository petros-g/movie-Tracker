import React, {useEffect, useState} from "react";

import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CarouselList from "../components/CarouselList";
import DetailModal from "../components/DetailModal";
import SearchBarItem from "../components/SearchBarItem";
import SimpleDropList from "../components/SimpleDropList";
import VideoModal from "../components/VideoModal";
import {setDetailModalVisible} from "../redux/slices/detailsSlice";
import {
  getGenres,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../redux/slices/moviesSlice";
import {setIsVideoModalVisible} from "../redux/slices/videoSlice";

export default function HomeScreen({route}) {
  const dispatch = useDispatch();

  const [changeLayout, setChangeLayout] = useState(false);

  const {moviesCurrent} = useSelector(state => state.moviesSlice);

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getGenres());
  }, [dispatch]);

  const onChangeCategory = category => {
    category === 0 && dispatch(getPopularMovies(category));
    category === 1 && dispatch(getUpcomingMovies(category));
    category === 2 && dispatch(getTopRatedMovies(category));
  };

  return (
    <View style={styles.container}>
      <SearchBarItem
        setChangeLayout={setChangeLayout}
        onChangeCategory={onChangeCategory}
      />
      {changeLayout ? (
        <CarouselList popularMovies={moviesCurrent} />
      ) : (
        <SimpleDropList data={moviesCurrent} type={"movie"} />
      )}
      <DetailModal
        onBackdropPress={() => dispatch(setDetailModalVisible(false))}
      />
      <VideoModal
        onBackdropPress={() => dispatch(setIsVideoModalVisible(false))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
  },
});
