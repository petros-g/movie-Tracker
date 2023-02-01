import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import ReactNativeModal from "react-native-modal";
import WebView from "react-native-webview";
import axios from "axios";
import {API_KEY} from "../api/apiFunctions";

export default function VideoModal({onBackdropPress, isVisible, id, tabIndex}) {
  const [link, setLink] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const type = tabIndex === 0 ? "movie" : "tv";
    if (isVisible) {
      axios
        .get(
          `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`,
        )
        .then(res => {
          let key = res.data.results?.find(item => item.type === "Trailer");
          if (key != undefined) {
            setLink(key.key);
          }

          setIsLoading(false);
        });
    }
  }, [isVisible, id, isLoading, link, tabIndex]);

  return (
    <View>
      <ReactNativeModal onBackdropPress={onBackdropPress} isVisible={isVisible}>
        <View style={{backgroundColor: "white", height: 600, width: "100%"}}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <WebView
              source={{uri: `https://www.youtube.com/watch?v=${link}`}}
            />
          )}
        </View>
      </ReactNativeModal>
    </View>
  );
}

const styles = StyleSheet.create({});
