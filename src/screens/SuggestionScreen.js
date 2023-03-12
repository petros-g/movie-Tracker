import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Button, Icon, Overlay} from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import {Spacer} from "../components/Spacer";
import SliderComp from "../components/SliderComp";
import {fetchSuggestions} from "../api/apiFunctions";
import {isEmpty} from "lodash";

const SuggestionScreen = () => {
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

  const fetchingFromApi = page => {
    fetchSuggestions(watchType, year, rating, runtime, page).then(res => {
      if (!isEmpty(res)) {
        const newArray = res?.filter(
          item => !alreadySearchedArray.includes(item.id),
        );

        setSuggestionData(newArray);
        setDataIndex(0);
        if (isEmpty(newArray)) {
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
    if (suggestionData[dataIndex]) {
      setAlreadySearchedArray([
        ...alreadySearchedArray,
        suggestionData[dataIndex].id,
      ]);
    }
  };

  useEffect(() => {
    setIsButtonDisabled(false);
  }, [rating, year, runtime]);

  const onFilterConfirm = () => {
    setIsOverlayVisible(false);
    setDataIndex(0);
    setSuggestionData("");
    setPage(1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Are you indecisive?</Text>
        <Text style={styles.text}>we got you with a button</Text>
        <Text style={styles.text}>
          {suggestionData[dataIndex]?.original_title}
        </Text>
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
      </View>
      <Overlay
        onShow={() => setIsButtonDisabled(true)}
        overlayStyle={{width: "60%", padding: 30}}
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
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
