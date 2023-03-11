import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from "@rneui/themed";
import React from "react";
import {StyleSheet} from "react-native";
import MoviesScreen from "../screens/MovieScreen";
import SeriesScreen from "../screens/SeriesScreen";
import SuggestionScreen from "../screens/SuggestionScreen";
import WatchlistScreen from "../screens/WatchlistScreen";

const BottomBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          margin: 15,
          position: "absolute",
          borderRadius: 50,
          backgroundColor: "#ffffff30",
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return <Icon name="list" color={"white"} />;
          },
          tabBarActiveTintColor: "white",
        }}
        name="Movies"
        component={MoviesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return <Icon name="list" color={"white"} />;
          },
          tabBarActiveTintColor: "white",
        }}
        name="Series"
        component={SeriesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return <Icon name="list" color={"white"} />;
          },
          tabBarActiveTintColor: "white",
        }}
        name="Suggestions"
        component={SuggestionScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return <Icon name="watch" color={"white"} />;
          },
          tabBarActiveTintColor: "white",
        }}
        name="Watchlist"
        component={WatchlistScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
