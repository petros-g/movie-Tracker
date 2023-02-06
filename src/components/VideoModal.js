import {StyleSheet, Text, View} from "react-native";
import React, {memo, useEffect, useState} from "react";
import ReactNativeModal from "react-native-modal";
import WebView from "react-native-webview";
import axios from "axios";
import {API_KEY} from "../api/apiFunctions";
import {useSelector} from "react-redux";

function VideoModal({onBackdropPress}) {
  const [isLoading, setIsLoading] = useState(false);
  const videoState = useSelector(res => res.videoSlice);
  const data = videoState?.videoData;
  // console.log(data);
  // useEffect(() => {
  //   if (data) {
  //     setIsLoading(false);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   const type = tabIndex === 0 ? "movie" : "tv";
  //   if (isVisible) {
  //     axios
  //       .get(
  //         `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`,
  //       )
  //       .then(res => {
  //         let key = res.data.results?.find(item => item.type === "Trailer");
  //         if (key != undefined) {
  //           setLink(key.key);
  //         }

  //         setIsLoading(false);
  //       });
  //   }
  // }, [isVisible, id, isLoading, link, tabIndex]);

  return (
    <View>
      <ReactNativeModal
        onBackdropPress={onBackdropPress}
        isVisible={videoState?.isVideoModalVisible}>
        <View style={{backgroundColor: "white", height: 600, width: "100%"}}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <WebView
              source={{
                uri: `https://www.youtube.com/watch?v=${data ? data : ""}`,
              }}
            />
          )}
        </View>
      </ReactNativeModal>
    </View>
  );
}

const styles = StyleSheet.create({});

export default memo(VideoModal);
