import {useEffect, useRef, useState} from "react";

import {StyleSheet, View} from "react-native";
import {fetchPopularMovies, fetchPopularSeries} from "../api/apiFunctions";
import CarouselList from "../components/CarouselList";
import SearchBarItem from "../components/SearchBarItem";
import SimpleDropList from "../components/SimpleDropList";
import {useData} from "../Context";

export default function HomeScreen({route}) {
  const {popularSeries, setPopularSeries} = useData();
  const [changeLayout, setChangeLayout] = useState(false);

  const flatlistRef = useRef();
  useEffect(() => {
    fetchPopularSeries().then(res => setPopularSeries(res.results));
  }, []);

  return (
    <View style={styles.container}>
      <SearchBarItem setChangeLayout={setChangeLayout} />
      {changeLayout ? (
        <CarouselList popularMovies={popularSeries} />
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
