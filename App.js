import {NavigationContainer} from "@react-navigation/native";
import React, {useEffect} from "react";
import {StyleSheet} from "react-native";
import {ContextProvider} from "./src/Context";
import AppStackScreen from "./src/routes/AppStackScreen";
import BottomBar from "./src/routes/BottomBar";

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <AppStackScreen />
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
