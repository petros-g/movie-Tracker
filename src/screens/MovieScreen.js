import React, {useEffect, useState} from "react";

import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import DetailModal from "../components/DetailModal";
import MainListsItem from "../components/MainListsItem";
import VideoModal from "../components/VideoModal";
import {setDetailModalVisible} from "../redux/slices/detailsSlice";
import {getGenres, getPopularMovies} from "../redux/slices/moviesSlice";
import {setIsVideoModalVisible} from "../redux/slices/videoSlice";

export default function HomeScreen({route}) {
  const dispatch = useDispatch();

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
