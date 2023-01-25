import {Icon, SearchBar} from "@rneui/themed";
import React from "react";
import {StyleSheet, View} from "react-native";

const SearchBarItem = ({setChangeLayout}) => {
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
    </View>
  );
};

export default SearchBarItem;

const styles = StyleSheet.create({});
