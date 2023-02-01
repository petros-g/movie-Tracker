import {useEffect, useState} from "react";

import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CarouselList from "../components/CarouselList";
import SearchBarItem from "../components/SearchBarItem";
import SimpleDropList from "../components/SimpleDropList";
import {getPopularSeries, getSeriesGenres} from "../redux/slices/seriesSlice";

export default function HomeScreen({route}) {
  const dispatch = useDispatch();
  const [changeLayout, setChangeLayout] = useState(false);

  const {seriesPopular} = useSelector(state => state.seriesSlice);

  useEffect(() => {
    dispatch(getPopularSeries());
  }, []);

  return (
    <View style={styles.container}>
      <SearchBarItem setChangeLayout={setChangeLayout} />
      {changeLayout ? (
        <CarouselList popularMovies={seriesPopular} />
      ) : (
        <SimpleDropList data={seriesPopular} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
  },
});
