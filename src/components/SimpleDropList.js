import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import {FlatList} from "react-native-gesture-handler";
import {useDispatch} from "react-redux";
import {
  getDetailsData,
  setDetailModalVisible,
} from "../redux/slices/detailsSlice";

const SimpleDropList = ({data, type}) => {
  const dispatch = useDispatch();

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setData] = useState(false);

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

  const onOpenModal = id => {
    dispatch(setDetailModalVisible(true));
    dispatch(getDetailsData({id: id, type}));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({item}) => (
          <View style={{flex: 1, height: 180}}>
            <TouchableOpacity onPress={() => onOpenModal(item?.id)}>
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
