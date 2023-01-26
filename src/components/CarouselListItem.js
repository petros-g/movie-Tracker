import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import React, {useMemo, useRef, useState} from "react";
import {useData} from "../Context";
import FastImage from "react-native-fast-image";
import {AnimatedCircularProgress} from "react-native-circular-progress";

export default function CarouselListItem({item, index, scrollX, genres}) {
  const {width} = useWindowDimensions();
  const IMAGE_WIDTH = useMemo(() => width * 0.7, [width]);
  const IMAGE_HEIGHT = useMemo(() => IMAGE_WIDTH * 1.54, [IMAGE_WIDTH]);

  const rotateY = useRef(new Animated.Value(0)).current;

  const [toggled, setToggled] = useState(false);

  const toggleAnimation = () => {
    setToggled(prev => !prev);

    Animated.timing(rotateY, {
      toValue: toggled ? 100 : 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const rotateImage = rotateY.interpolate({
    inputRange: [0, 50],
    outputRange: ["360deg", "270deg"],
    extrapolate: "clamp",
  });
  const rotateDetails = rotateY.interpolate({
    inputRange: [60, 100],
    outputRange: ["90deg", "0deg"],
    extrapolate: "clamp",
  });
  const opacity = scrollX.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [0, 1, 0],
  });

  const genresFinal = item?.genres?.map(id => {
    return genres?.find(genre => genre.id === id);
  });
  return (
    <View
      style={{
        width,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <TouchableWithoutFeedback style={{zIndex: 11}} onPress={toggleAnimation}>
        <Animated.View
          style={{
            height: IMAGE_HEIGHT,
            width: IMAGE_WIDTH,
            transform: [{rotateY: rotateImage}],
          }}>
          <AnimatedCircularProgress
            style={{
              zIndex: 1,

              position: "absolute",
              right: 10,
              top: 10,
            }}
            size={50}
            width={5}
            fill={Number(item?.rating) * 10}
            tintColor="purple"
            tintColorSecondary="green">
            {() => (
              <Text
                style={{
                  color: "black",
                  backgroundColor: "#ffffff50",
                  padding: 10,
                }}>
                {item?.rating.toFixed(1)}
              </Text>
            )}
          </AnimatedCircularProgress>
          <Animated.Image
            style={{
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
              resizeMode: "cover",
              position: "absolute",
              borderRadius: 16,
            }}
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster}`,
            }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleAnimation}>
        <Animated.View
          style={{
            height: IMAGE_HEIGHT,
            width: IMAGE_WIDTH,
            position: "absolute",
            borderRadius: 16,
            alignItems: "center",
            backgroundColor: "white",
            transform: [{rotateY: rotateDetails}],
            overflow: "hidden",
          }}>
          <FastImage
            style={{
              width: "100%",
              height: 150,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              overflow: "visible",
            }}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.backdrop}`,
            }}>
            <View style={styles.title}>
              <Text style={{color: "black"}}>{item.title}</Text>
            </View>
          </FastImage>

          <View style={{marginTop: 30}} />
          <View style={{}}>
            <Text
              style={{
                paddingHorizontal: 10,
                textAlign: "center",
                fontSize: 13,
              }}>
              {item.description}
            </Text>
          </View>
          <View style={styles.genreView}>
            {genresFinal.map(genre => (
              <Text
                style={{
                  margin: 2,

                  padding: 5,
                  borderWidth: 1,
                  borderRadius: 25,
                }}
                key={genre.id}>
                {genre.name}
              </Text>
            ))}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    bottom: -12,
    zIndex: 100,
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
  },
  genreView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
