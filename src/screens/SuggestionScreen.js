import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Button, Icon, Overlay} from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import {Spacer} from "../components/Spacer";
import SliderComp from "../components/SliderComp";
import {fetchSuggestions} from "../api/apiFunctions";

const SuggestionScreen = () => {
  const [suggestionData, setSuggestionData] = useState();
  const [watchType, setWatchType] = useState("movie");
  const [rating, setRating] = useState(1);
  const [year, setYear] = useState(1950);
  const [genres, setGenres] = useState();
  const [runtime, setRuntime] = useState(15);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const suggestionsApiCall = () => {
    fetchSuggestions(watchType, year, rating, runtime).then(res =>
      setSuggestionData(res),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Are you indecisive?</Text>
        <Text style={styles.text}>we got you with a button</Text>
        <Spacer height={20} />
        <Button
          onPress={() => suggestionsApiCall()}
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
        <TouchableOpacity onPress={() => setIsOverlayVisible(true)}>
          <Text style={{color: "red"}}>
            <Icon name="settings" size={10} color={"red"} /> filters
          </Text>
        </TouchableOpacity>
      </View>
      <Overlay
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
        <Button title={"Set"} onPress={() => setIsOverlayVisible(false)} />
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
