import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import OutlineButton from "../components/UI/OutlineButton";
import { GlobalColors } from "../constant/global-colors";
import { fetchPlaceDetails } from "../utils/database";

const PlaceDetail_screen = ({ navigation, route }) => {
  const [details, setdetails] = useState();
  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: details.lat,
      initialLng: details.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      let place = await fetchPlaceDetails(selectedPlaceId);
      setdetails(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  return details ? (
    <ScrollView>
      <Image style={styles.image} source={{ uri: details.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{details.address}</Text>
        </View>
        <OutlineButton onPress={showOnMapHandler} icon="map">
          View on map
        </OutlineButton>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.fallback}>
      <Text style={styles.fallbackText}>Loading Place Data...</Text>
    </View>
  );
};

export default PlaceDetail_screen;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: GlobalColors.cultured,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalColors.cultured,
  },
});
