import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import {StyleSheet} from "react-native";
import MovieScreen from "../screens/MovieScreen";
import TvScreen from "../screens/TvScreen";

const HomeTabBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Movie" component={MovieScreen} />
      <Tab.Screen name="TV" component={TvScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabBar;

const styles = StyleSheet.create({});
