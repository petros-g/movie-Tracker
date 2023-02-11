import React, {memo, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import ReactNativeModal from "react-native-modal";
import WebView from "react-native-webview";
import {useSelector} from "react-redux";

function VideoModal({onBackdropPress}) {
  const videoState = useSelector(res => res.videoSlice);
  const data = videoState?.videoData;

  return (
    <View>
      <ReactNativeModal
        onBackdropPress={onBackdropPress}
        isVisible={videoState?.isVideoModalVisible}>
        <View style={{backgroundColor: "white", height: 600, width: "100%"}}>
          <WebView
            source={{
              uri: `https://www.youtube.com/watch?v=${data ? data : ""}`,
            }}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
}

const styles = StyleSheet.create({});

export default memo(VideoModal);
