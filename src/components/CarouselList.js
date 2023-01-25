import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import React, {useMemo, useRef, useState} from "react";
import {Animated} from "react-native";
import FastImage from "react-native-fast-image";
import {AnimatedCircularProgress} from "react-native-circular-progress";

const CarouselList = ({popularMovies}) => {
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

  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <View style={StyleSheet.absoluteFillObject}>
        {popularMovies?.map((item, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              blurRadius={3}
              source={{
                uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
              }}
              style={[StyleSheet.absoluteFillObject, {opacity, zIndex: -1}]}
            />
          );
        })}
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{alignItems: "center"}}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0, 1, 0],
          });

          return (
            <View
              style={{
                width,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <AnimatedCircularProgress
                style={{zIndex: 10}}
                size={120}
                width={15}
                fill={50}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
              />
              <TouchableWithoutFeedback onPress={toggleAnimation}>
                <Animated.Image
                  style={{
                    height: IMAGE_HEIGHT,
                    width: IMAGE_WIDTH,
                    resizeMode: "cover",
                    borderRadius: 16,
                    opacity,
                    transform: [{rotateY: rotateImage}],
                    position: "absolute",
                  }}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                  }}
                />
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
                      uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                    }}>
                    <View style={styles.title}>
                      <Text style={{color: "black"}}>
                        {item.original_title}
                      </Text>
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
                      {item.overview}
                    </Text>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          );
        }}
        keyExtractor={item => item.id}
        data={popularMovies}
      />
    </>
  );
};

export default CarouselList;

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
});
