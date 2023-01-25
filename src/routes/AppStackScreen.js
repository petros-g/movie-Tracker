import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import BottomBar from "./BottomBar";

const Stack = createNativeStackNavigator();

function AppStackScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={BottomBar} />
    </Stack.Navigator>
  );
}

export default AppStackScreen;
