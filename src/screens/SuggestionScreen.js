import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Button, CheckBox, Chip, Icon, Overlay} from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import {Spacer} from "../components/Spacer";
import SliderComp from "../components/SliderComp";
import {fetchSuggestions} from "../api/apiFunctions";
import {isEmpty} from "lodash";
import FastImage from "react-native-fast-image";
import {useDispatch} from "react-redux";
import {
  getDetailsData,
  setDetailModalVisible,
} from "../redux/slices/detailsSlice";

const SuggestionScreen = () => {
  const dispatch = useDispatch();
  const [suggestionData, setSuggestionData] = useState("");
  const [dataIndex, setDataIndex] = useState(0);
  const [alreadySearchedArray, setAlreadySearchedArray] = useState([]);
  const [page, setPage] = useState(1);
  const [watchType, setWatchType] = useState("movie");
  const [rating, setRating] = useState(1);
  const [year, setYear] = useState(1950);
  const [genres, setGenres] = useState();
  const [runtime, setRuntime] = useState(15);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [checkbox, setCheckBox] = useState(false);

  const fetchingFromApi = page => {
    fetchSuggestions(watchType, year, rating, runtime, page).then(res => {
      if (!isEmpty(res)) {
        const newArray = res?.filter(
          item => !alreadySearchedArray.includes(item.id),
        );

        setSuggestionData(checkbox ? newArray : res);
        setDataIndex(0);
        if (isEmpty(newArray) && checkbox) {
          fetchingFromApi(page + 1);
        }
      } else {
        Alert.alert("Error");
      }
    });
  };

  const suggestionAction = () => {
    if (isEmpty(suggestionData)) {
      fetchingFromApi(page);
    } else {
      checksForAlreadyList();
      setDataIndex(prev => prev + 1);
    }

    if (isEmpty(suggestionData[dataIndex + 1]) && !isEmpty(suggestionData)) {
      setPage(page + 1);
      fetchingFromApi(page + 1);
      if (isEmpty(suggestionData) && !isEmpty(alreadySearchedArray)) {
        Alert.alert("Error");
      }
    }
  };

  const checksForAlreadyList = () => {
    if (
      suggestionData[dataIndex] &&
      !alreadySearchedArray?.includes(suggestionData[dataIndex].id)
    ) {
      setAlreadySearchedArray([
        ...alreadySearchedArray,
        suggestionData[dataIndex].id,
      ]);
    }
  };

  useEffect(() => {
    setIsButtonDisabled(false);
  }, [rating, year, runtime, checkbox]);

  const onFilterConfirm = () => {
    setIsOverlayVisible(false);
    setDataIndex(0);
    setSuggestionData("");
    setPage(1);
  };

  const openModal = (id, type) => {
    dispatch(setDetailModalVisible(true));
    dispatch(getDetailsData({id: id, type}));
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Are you indecisive?</Text>
        <Text style={styles.text}>we got you with a button</Text>

        <Spacer height={20} />
        <Button
          onPress={() => suggestionAction()}
          size="lg"
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ["#FF9800", "#F44336"],
            start: {x: 0, y: 0},
            end: {x: 0.1, y: 1.2},
          }}>
          Enlighten me
        </Button>
        <Spacer height={5} />
        <TouchableOpacity
          onPress={() => {
            setIsOverlayVisible(true);
          }}>
          <Text style={{color: "red"}}>
            <Icon name="settings" size={10} color={"red"} /> filters
          </Text>
        </TouchableOpacity>
        {suggestionData[dataIndex] && (
          <TouchableOpacity
            onPress={() => openModal(suggestionData[dataIndex]?.id, "movie")} //attention
            key={suggestionData[dataIndex]?.id}
            style={styles.touchableOpacity}>
            <FastImage
              style={{height: 180, width: 120}}
              resizeMode={FastImage.resizeMode.contain}
              source={{
                uri: `https://image.tmdb.org/t/p/w200${
                  suggestionData[dataIndex]?.poster ||
                  suggestionData[dataIndex]?.poster_path
                }`,
              }}
            />
            <View style={styles.descrView}>
              <Text style={styles.title}>
                {suggestionData[dataIndex].title}{" "}
                <Text style={{color: "gray", fontSize: 15}}>
                  ({suggestionData[dataIndex].type || "movie"})
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}>
                {suggestionData[dataIndex]?.rating?.toFixed(1) ||
                  suggestionData[dataIndex]?.vote_average?.toFixed(1)}
                ⭐
              </Text>
              <Chip
                title={
                  suggestionData[dataIndex]?.release?.slice(0, 4) ||
                  suggestionData[dataIndex]?.release_date?.slice(0, 4)
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
        )}
      </View>
      <Overlay
        onShow={() => setIsButtonDisabled(true)}
        overlayStyle={{width: "80%", padding: 15}}
        animationType="fade"
        isVisible={isOverlayVisible}
        onBackdropPress={() => setIsOverlayVisible(false)}>
        <Text style={{alignSelf: "center"}}>Set search preferences</Text>
        <Spacer height={20} />
        <SliderComp
          minimumValue={1}
          step={0.5}
          value={rating}
          setValue={setRating}
          label="Rating"
        />
        <SliderComp
          minimumValue={1950}
          maximumValue={2023}
          value={year}
          setValue={setYear}
          label="Year"
        />
        <SliderComp
          minimumValue={15}
          maximumValue={300}
          value={runtime}
          setValue={setRuntime}
          label="Length (mins)"
        />
        <CheckBox
          textStyle={{flex: 0}}
          title="Skip already suggested matches"
          checked={checkbox}
          onPress={() => setCheckBox(!checkbox)}
        />
        <Button
          disabled={isButtonDisabled}
          title={"Set"}
          onPress={onFilterConfirm}
        />
      </Overlay>
    </View>
  );
};

export default SuggestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
  },
  content: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  touchableOpacity: {
    padding: 10,
    flexDirection: "row",
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
