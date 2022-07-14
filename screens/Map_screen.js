import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";
import { useCallback } from "react";

const Map_screen = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  const [selectedLocation, setselectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : -6.205451,
    longitude: initialLocation ? initialLocation.lng : 106.825093,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  }; //region: jakarta

  function selectLocationHandler(event) {
    if (initialLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setselectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );

      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map_screen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
