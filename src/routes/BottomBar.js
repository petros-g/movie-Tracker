import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from "@rneui/themed";
import React from "react";
import {StyleSheet} from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SeriesScreen from "../screens/SeriesScreen";

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
        component={HomeScreen}
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
    </Tab.Navigator>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
