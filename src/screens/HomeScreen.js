import {useEffect, useRef, useState} from "react";

import {StyleSheet, View} from "react-native";
import {fetchPopularMovies} from "../api/apiFunctions";
import CarouselList from "../components/CarouselList";
import SearchBarItem from "../components/SearchBarItem";
import SimpleDropList from "../components/SimpleDropList";
import {useData} from "../Context";

export default function HomeScreen({route}) {
  const {popularMovies, popularSeries, setPopularMovies} = useData();
  const [changeLayout, setChangeLayout] = useState(false);

  useEffect(() => {
    fetchPopularMovies().then(res => setPopularMovies(res.results));
  }, []);

  return (
    <View style={styles.container}>
      <SearchBarItem setChangeLayout={setChangeLayout} />
      {changeLayout ? (
        <CarouselList popularMovies={popularMovies} />
      ) : (
        <SimpleDropList data={popularMovies} />
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
