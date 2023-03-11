import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Icon, Slider} from "@rneui/themed";

export default function SliderComp({
  value,
  setValue,
  step = 1,
  maximumValue = 10,
  minimumValue = 0,
  label = "Set text",
}) {
  return (
    <>
      <Text>
        {label} ≥ {value}
      </Text>
      <Slider
        value={value}
        onValueChange={setValue}
        maximumValue={maximumValue}
        minimumValue={minimumValue}
        step={step}
        allowTouchTrack
        trackStyle={{height: 5, backgroundColor: "transparent"}}
        thumbStyle={{height: 20, width: 20, backgroundColor: "blue"}}
      />
    </>
  );
}

const styles = StyleSheet.create({});
