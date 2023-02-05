import {
  Button,
  ButtonGroup,
  Icon,
  Overlay,
  SearchBar,
  Text,
} from "@rneui/themed";
import React, {useState} from "react";
import {StyleSheet, View} from "react-native";

const SearchBarItem = ({setChangeLayout, onChangeCategory}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ["Most Popular", "Upcoming", "Top Rated"];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Icon
        name="list"
        color={"white"}
        onPress={() => setChangeLayout(e => !e)}
      />

      <Icon
        style={{paddingHorizontal: 5}}
        name="settings"
        color={"white"}
        onPress={() => setIsOverlayVisible(true)}
      />

      <SearchBar
        inputContainerStyle={{backgroundColor: "#ffffff20"}}
        containerStyle={{
          backgroundColor: "transparent",
          borderColor: "transparent",
          borderRadius: 10,
          flex: 1,
        }}
        placeholder="Search"
        round
        rightIcon={{type: "font-awesome", name: "search"}}
      />
      <Overlay
        isVisible={isOverlayVisible}
        onBackdropPress={() => setIsOverlayVisible(false)}>
        <View
          style={{
            width: 300,
            justifyContent: "center",
          }}>
          <Text style={{alignSelf: "center"}}>Select category:</Text>
          <ButtonGroup
            onPress={setSelectedIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
          />

          <Button
            onPress={() => {
              onChangeCategory(selectedIndex);
              setIsOverlayVisible(false);
            }}
            title={"Confirm"}
            type="solid"
            radius={20}
            size="md"
            color={"success"}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default SearchBarItem;

const styles = StyleSheet.create({});
