import {Chip} from "@rneui/themed";
import React, {memo} from "react";
import {StyleSheet, Text, View} from "react-native";
import FastImage from "react-native-fast-image";
import ReactNativeModal from "react-native-modal";
import {useSelector} from "react-redux";

function DetailModal({onBackdropPress}) {
  const {genres} = useSelector(state => state.moviesSlice);
  const detailState = useSelector(res => res.detailsSlice);
  const data = detailState?.detailsData;
  const genresFinal = data?.genres?.map(id => {
    return genres?.find(genre => genre.id === id.id);
  });

  return (
    <View>
      <ReactNativeModal
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        onBackdropPress={onBackdropPress}
        isVisible={detailState?.isDetailModalVisible}>
        <View style={styles.container}>
          <FastImage
            resizeMode="cover"
            style={styles.backDropImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${data?.backdrop_path}`,
            }}
          />
          <View style={{padding: 5}}>
            <View
              style={{flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.title}>{data?.title}</Text>
              <Text style={[styles.title, {fontWeight: "400"}]}>
                {data?.vote_average?.toFixed(1)}⭐
              </Text>
            </View>

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
