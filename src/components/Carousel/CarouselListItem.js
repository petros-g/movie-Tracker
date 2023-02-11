import {Button, Chip, Icon, Text} from "@rneui/themed";
import React, {useMemo, useRef, useState} from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import FastImage from "react-native-fast-image";

export default function CarouselListItem({
  item,
  index,
  scrollX,
  genres,
  onOpenVideoModal,
  onOpenDetailModal,
}) {
  const {width} = useWindowDimensions();
  const IMAGE_WIDTH = useMemo(() => width * 0.7, [width]);
  const IMAGE_HEIGHT = useMemo(() => IMAGE_WIDTH * 1.54, [IMAGE_WIDTH]);

  const rotateY = useRef(new Animated.Value(0)).current;

  const [toggled, setToggled] = useState(false);

  const toggleAnimation = () => {
    setToggled(prev => !prev);

    Animated.timing(rotateY, {
      toValue: toggled ? 100 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const rotateImage = rotateY.interpolate({
    inputRange: [0, 50],
    outputRange: ["360deg", "270deg"],
    extrapolate: "clamp",
  });

  const rotateDetails = useMemo(
    () =>
      rotateY.interpolate({
        inputRange: [60, 100],
        outputRange: ["90deg", "0deg"],
        extrapolate: "clamp",
      }),
    [rotateY],
  );

  const opacity = scrollX.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [0, 1, 0],
  });

  const genresFinal = item?.genres?.map(id => {
    if (genres) {
      return genres?.find(genre => genre.id === id);
    }
  });

  const {
    container,
    circular,
    circularText,
    flippedSideContainer,
    flippedSideImage,
  } = styles;
  return (
    <View
      style={[
        container,
        {
          width,
        },
      ]}>
      <TouchableWithoutFeedback style={{zIndex: 11}} onPress={toggleAnimation}>
        <Animated.View
          style={{
            height: IMAGE_HEIGHT,
            width: IMAGE_WIDTH,
            transform: [{rotateY: rotateImage}],
          }}>
          <View style={{position: "absolute", zIndex: 10}}>
            <Icon
              onPress={() => onOpenVideoModal(item?.id)}
              size={20}
              reverse
              name="play"
              type="ionicon"
              color="#517fa4"
            />
          </View>

          <AnimatedCircularProgress
            style={circular}
            size={50}
            width={5}
            fill={Number(item?.rating) * 10}
            tintColor="purple"
            tintColorSecondary="green">
            {() => <Text style={circularText}>{item?.rating.toFixed(1)}</Text>}
          </AnimatedCircularProgress>

          <FastImage
            style={{
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
              borderRadius: 16,
            }}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster}`,
            }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleAnimation}>
        <Animated.View
          style={[
            flippedSideContainer,
            {
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
              transform: [{rotateY: rotateDetails}],
            },
          ]}>
          <FastImage
            style={flippedSideImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.backdrop}`,
            }}>
            <View style={styles.title}>
              <Text style={{color: "black"}}>{item.title}</Text>
            </View>
          </FastImage>
          <View style={{marginTop: 25}} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Chip
              title={item?.release.slice(0, 4)}
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
                marginLeft: 10,
                alignSelf: "flex-start",
              }}
            />
            <Text style={{right: 10, fontSize: 20}}>{item.rating}⭐</Text>
          </View>
          <View style={{marginTop: 10}} />
          <Text numberOfLines={5} style={styles.description}>
            {item.description}
          </Text>
          <View style={{marginTop: 10}} />

          <View style={styles.genreView}>
            {genresFinal.map(genre => (
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

          <Button
            onPress={() => onOpenDetailModal(item?.id)}
            icon={{
              name: "arrow-up",
              type: "font-awesome",
              size: 25,
              color: "white",
            }}
            loading={false}
            buttonStyle={{
              backgroundColor: "#00000080",
            }}
            containerStyle={{
              justifyContent: "flex-end",
              flex: 1,
            }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    paddingHorizontal: 15,
    textAlign: "justify",
    fontSize: 12,
  },
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
  genreText: {
    margin: 2,

    padding: 5,

    borderRadius: 25,
    elevation: 10,
  },
  circular: {
    zIndex: 1,

    position: "absolute",
    right: 10,
    top: 10,
  },
  circularText: {color: "black", backgroundColor: "#ffffff50", padding: 10},
  flippedSideContainer: {
    position: "absolute",
    borderRadius: 16,
    backgroundColor: "white",
    overflow: "hidden",
  },
  flippedSideImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "visible",
  },
});
