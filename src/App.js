import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {Provider} from "react-redux";
import {ContextProvider} from "./Context";
import store from "./redux/store";
import AppStackScreen from "./routes/AppStackScreen";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStackScreen />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
