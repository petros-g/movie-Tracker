import {useCallback, useEffect, useState} from "react";

import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CarouselList from "../components/CarouselList";
import MainListsItem from "../components/MainListsItem";
import SearchBarItem from "../components/SearchBarItem";
import SimpleDropList from "../components/SimpleDropList";
import {
  getPopularSeries,
  getSeriesGenres,
  getTopRatedSeries,
  getUpcomingSeries,
} from "../redux/slices/seriesSlice";

export default function HomeScreen({route}) {
  const dispatch = useDispatch();
  const [changeLayout, setChangeLayout] = useState(false);

  const {seriesCurrent} = useSelector(state => state.seriesSlice);

  useEffect(() => {
    dispatch(getPopularSeries());
  }, [dispatch]);

  const onChangeCategory = useCallback(
    category => {
      category === 0 && dispatch(getPopularSeries(category));
      category === 1 && dispatch(getUpcomingSeries(category));
      category === 2 && dispatch(getTopRatedSeries(category));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <MainListsItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
  },
});
