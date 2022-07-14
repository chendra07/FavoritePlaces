import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { store } from "./redux/store";
import AllPlaces_screen from "./screens/AllPlaces_screen";
import AddPlace_screen from "./screens/AddPlace_screen";
import IconButton from "./components/UI/IconButton";
import { GlobalColors } from "./constant/global-colors";
import Map_screen from "./screens/Map_screen";
import { useEffect, useState } from "react";
import { init } from "./utils/database";
import AppLoading from "expo-app-loading";
import PlaceDetail_screen from "./screens/PlaceDetail_screen";

let persistor = persistStore(store);

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setdbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setdbInitialized(true);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalColors.blueYonder },
              headerTintColor: GlobalColors.cultured,
              contentStyle: {
                backgroundColor: GlobalColors.darkCornFlowerBlue,
              },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces_screen}
              options={({ navigation }) => ({
                title: "Your Favorite Places",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="add"
                    size={30}
                    color={tintColor}
                    onPress={() => navigation.navigate("AddPlace")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace_screen}
              options={({ navigation }) => ({
                title: "Add a new Place",
              })}
            />
            <Stack.Screen
              name="Map"
              component={Map_screen}
              // options={{
              //   title: ""
              // }}
            />
            <Stack.Screen
              name="PlaceDetails"
              component={PlaceDetail_screen}
              options={{
                title: "Loading Place.......",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
}
