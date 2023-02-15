import {Chip, Icon} from "@rneui/themed";
import React, {memo, useCallback, useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import FastImage from "react-native-fast-image";
import ReactNativeModal from "react-native-modal";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteItemInList,
  setWatchlist,
} from "../../redux/slices/watchlistSlice";

function DetailModal({onBackdropPress}) {
  const dispatch = useDispatch();
  const {genres} = useSelector(state => state.moviesSlice);
  const detailState = useSelector(res => res.detailsSlice);
  const {watchlist, ids} = useSelector(state => state.watchlistSlice);
  const data = detailState?.detailsData;
  const genresFinal = data?.genres?.map(id => {
    return genres?.find(genre => genre.id === id.id);
  });
  const [itemAlreadyInList, setItemAlreadyInList] = useState(false);

  const isItemInWatchList = useCallback(() => {
    return ids.includes(data?.id);
  }, [data?.id]);

  useEffect(() => {
    if (isItemInWatchList()) {
      setItemAlreadyInList(true);
    } else {
      setItemAlreadyInList(false);
    }
  }, [data?.id]);

  const onPress = () => {
    if (itemAlreadyInList) {
      dispatch(deleteItemInList(data?.id));
      setItemAlreadyInList(false);
    } else {
      dispatch(setWatchlist(data?.id));
      setItemAlreadyInList(true);
    }
  };

  return (
    <View>
      <ReactNativeModal
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        onBackdropPress={onBackdropPress}
        isVisible={detailState?.isDetailModalVisible}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 15}}>
            <FastImage
              resizeMode="cover"
              style={styles.backDropImage}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${
                  data?.backdrop_path ? data?.backdrop_path : data?.poster_path
                }`,
              }}
            />
            <View style={{padding: 5}}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}>
                <Text style={styles.title}>{data?.title}</Text>
                <Text style={[styles.title, {fontWeight: "400"}]}>
                  {data?.vote_average?.toFixed(1)}⭐
                </Text>
              </View>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Chip
                  title={data?.release_date?.slice(0, 4)}
                  size="sm"
                  icon={{
                    name: "calendar",
                    type: "font-awesome",
                    size: 15,
                    color: "white",
                  }}
                  raised
                  color={"#292b30"}
                  buttonStyle={{elevation: 8}}
                  containerStyle={{
                    marginVertical: 10,
                    alignSelf: "flex-start",
                  }}
                />
                <Icon
                  onPress={onPress}
                  style={{marginLeft: 5}}
                  size={25}
                  name={itemAlreadyInList ? "heart" : "heart-outline"}
                  type="ionicon"
                  color={itemAlreadyInList ? "red" : "black"}
                />
              </View>
              <Text style={{textAlign: "justify", padding: 15}}>
                {data?.overview}
              </Text>
              <View style={styles.genreView}>
                {genresFinal?.map(genre => (
                  <Chip
                    key={genre?.id}
                    titleStyle={{color: "gray"}}
                    type="outline"
                    raised
                    size="sm"
                    radius={5}
                    buttonStyle={{
                      borderColor: "transparent",
                      backgroundColor: "white",
                      elevation: 0,
                    }}
                    containerStyle={{
                      margin: 3,
                    }}>
                    {genre?.name}
                  </Chip>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </ReactNativeModal>
    </View>
  );
}

export default memo(DetailModal);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 600,
    borderRadius: 20,
  },
  backDropImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  genreView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontSize: 18,
    fontWeight: "800",
  },
});
