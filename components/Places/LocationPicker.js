import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import OutlineButton from "../UI/OutlineButton";
import { GlobalColors } from "../../constant/global-colors";
import expoVerifyPermission from "../../utils/expoVerifyPermission";
import { getMapPreview } from "../../utils/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { loading_actions, map_actions } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const { showLoading, dismissLoading } = loading_actions;
const { getAddress } = map_actions;

const LocationPicker = ({ onPickLocation }) => {
  const [pickedLocation, setpickedLocation] = useState();
  const [currentAddress, setcurrentAddress] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const route = useRoute();

  const { loading } = useSelector((state) => state.loading);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      setpickedLocation({
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      });
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await dispatch(
          getAddress(
            pickedLocation.lat,
            pickedLocation.lng,
            showLoading,
            dismissLoading
          )
        );
        console.log("address: ", address);
        setcurrentAddress(address);
        onPickLocation({ ...pickedLocation, address: address });
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermission() {
    return await expoVerifyPermission(
      locationPermissionInformation,
      PermissionStatus,
      requestPermission
    );
  }

  async function getLocationHandler() {
    const isVerified = await verifyPermission();

    if (!isVerified) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setpickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <Image
            style={styles.image}
            source={{
              uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
            }}
          />
        ) : (
          <Text style={styles.noPickedLocationText}>No preview yet</Text>
        )}
      </View>
      <View>
        <Text
          style={{
            fontSize: 16,
            color: GlobalColors.cultured,
            textAlign: "center",
            marginVertical: 8,
          }}
        >
          {currentAddress ? (
            currentAddress
          ) : loading ? (
            <ActivityIndicator size="large" />
          ) : (
            "No location picked yet"
          )}
        </Text>
      </View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalColors.spaceCadet,
    borderRadius: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  noPickedLocationText: {
    color: GlobalColors.cultured,
    fontSize: 18,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
