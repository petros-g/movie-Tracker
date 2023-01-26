import {useEffect, useRef, useState} from "react";

import {StyleSheet, View} from "react-native";
import {fetchPopularSeries, fetchSeriesGenres} from "../api/apiFunctions";
import CarouselList from "../components/CarouselList";
import SearchBarItem from "../components/SearchBarItem";
import SimpleDropList from "../components/SimpleDropList";
import {useData} from "../Context";

export default function HomeScreen({route}) {
  const {popularSeries, setSeriesGenres, setPopularSeries, seriesGenres} =
    useData();
  const [changeLayout, setChangeLayout] = useState(false);

  const flatlistRef = useRef();
  useEffect(() => {
    fetchPopularSeries().then(res => setPopularSeries(res));
    fetchSeriesGenres().then(res => setSeriesGenres(res.genres));
  }, []);

  return (
    <View style={styles.container}>
      <SearchBarItem setChangeLayout={setChangeLayout} />
      {changeLayout ? (
        <CarouselList popularMovies={popularSeries} genres={seriesGenres} />
      ) : (
        <SimpleDropList data={popularSeries} />
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
