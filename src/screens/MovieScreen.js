import React, {useEffect} from "react";

import {StyleSheet, View} from "react-native";
import {useDispatch} from "react-redux";
import MainListsItem from "../components/MainListsItem";
import DetailModal from "../components/Modals/DetailModal";
import VideoModal from "../components/Modals/VideoModal";
import {setDetailModalVisible} from "../redux/slices/detailsSlice";
import {getGenres, getPopularMovies} from "../redux/slices/moviesSlice";
import {getPopularSeries} from "../redux/slices/seriesSlice";
import {setIsVideoModalVisible} from "../redux/slices/videoSlice";

export default function MoviesScreen({route}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getGenres());
    dispatch(getPopularSeries());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <MainListsItem type={"movie"} />
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
