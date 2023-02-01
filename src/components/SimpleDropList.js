import React, {useCallback, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import {FlatList} from "react-native-gesture-handler";
import {useDispatch, useSelector} from "react-redux";
import {fetchDetails} from "../api/apiFunctions";
import {getDetailsData, setModalVisible} from "../redux/slices/detailsSlice";
import DetailModal from "./DetailModal";

const SimpleDropList = ({data, type}) => {
  const dispatch = useDispatch();

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setData] = useState(false);
  const state = useSelector(res => res.detailsSlice);

  // const goToDetail = useCallback(
  //   id => {
  //     setIsLoading(true);
  //     fetchDetails(id, type).then(res => {
  //       setData(res);
  //       setIsDetailModalVisible(true);
  //     });
  //   },
  //   [type],
  // );

  const onPress = id => {
    setIsDetailModalVisible(true);
    dispatch(getDetailsData({id: id, type}));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({item}) => (
          <View style={{flex: 1, height: 180}}>
            <TouchableOpacity onPress={() => onPress(item?.id)}>
              <FastImage
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${item.poster}`,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <DetailModal
        data={state?.detailsData}
        isVisible={isDetailModalVisible}
        onBackdropPress={() => setIsDetailModalVisible(false)}
      />
    </View>
  );
};

export default SimpleDropList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
  },
  image: {
    height: 180,
  },
});
