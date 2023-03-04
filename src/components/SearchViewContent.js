import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import {Chip} from "@rneui/themed";
import {
  getDetailsData,
  setDetailModalVisible,
} from "../redux/slices/detailsSlice";
import {useDispatch} from "react-redux";

const SearchViewContent = ({state, data}) => {
  const dispatch = useDispatch();
  const dataToRender = state ? state?.moviesSlice?.searchResults : data;

  const onOpenModal = (id, type) => {
    dispatch(setDetailModalVisible(true));
    dispatch(getDetailsData({id: id, type}));
  };

  return (
    <View
      style={{
        backgroundColor: "#18181c",
        flex: 1,
      }}>
      <ScrollView>
        {dataToRender?.map(item => {
          return (
            <TouchableOpacity
              key={item?.id}
              onPress={() => onOpenModal(item?.id, item?.type)}
              style={styles.touchableOpacity}>
              <FastImage
                style={{height: 180, width: 120}}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${
                    item.poster || item.poster_path
                  }`,
                }}
              />
              <View style={styles.descrView}>
                <Text style={styles.title}>
                  {item.title}{" "}
                  <Text style={{color: "gray", fontSize: 15}}>
                    ({item.type || "movie"})
                  </Text>
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                  }}>
                  {item?.rating?.toFixed(1) || item?.vote_average?.toFixed(1)}⭐
                </Text>
                <Chip
                  title={
                    item?.release?.slice(0, 4) ||
                    item?.release_date?.slice(0, 4)
                  }
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
                    alignSelf: "flex-start",
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    padding: 10,
    flexDirection: "row",

    flex: 1,
    margin: 0,
  },
  descrView: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-evenly",
  },
  title: {
    color: "white",

    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SearchViewContent;
