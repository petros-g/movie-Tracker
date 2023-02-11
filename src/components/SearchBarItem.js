import {
  Button,
  ButtonGroup,
  Icon,
  Overlay,
  SearchBar,
  Text,
} from "@rneui/themed";
import {debounce, once} from "lodash";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useDispatch} from "react-redux";
import {getSearchResults, setSearchResults} from "../redux/slices/moviesSlice";

const SearchBarItem = ({
  setChangeLayout,
  onChangeCategory,
  setIsSearching,
  type,
}) => {
  const dispatch = useDispatch();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const buttons = ["Most Popular", "Upcoming", "Top Rated"];
  const searchBarRef = useRef();

  const onSearch = searchText => {
    setSearchText(searchText);
    changeTextDebouncer(searchText);
  };

  const changeTextDebouncer = useCallback(
    debounce(searchText => dispatch(getSearchResults(searchText)), 1000),
    [],
  );

  const onSearchBackPress = useCallback(() => {
    setIsSearching(false);
    dispatch(setSearchResults());
    setSearchText("");
    searchBarRef.current.blur();
    searchBarRef.current.isFocused = false;
  }, []);

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
        ref={searchBarRef}
        inputContainerStyle={{backgroundColor: "#ffffff20"}}
        containerStyle={{
          backgroundColor: "transparent",
          borderColor: "transparent",
          borderRadius: 10,
          flex: 1,
        }}
        onFocus={() => {
          searchBarRef.current.isFocused = true;
          setIsSearching(true);
        }}
        placeholder="Search"
        round
        value={searchText}
        onChangeText={onSearch}
        searchIcon={
          <Icon
            onPress={onSearchBackPress}
            name={searchBarRef?.current?.isFocused ? "arrow-back" : null}
            color="#00aced"
          />
        }
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
