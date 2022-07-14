import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { GlobalColors } from "../../constant/global-colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Place } from "../../models/place_model";
import { insertPlace } from "../../utils/database";

const PlaceForm = () => {
  const navigation = useNavigation();
  const [enteredTitle, setenteredTitle] = useState();
  const [selectedImage, setselectedImage] = useState();
  const [pickedLocation, setpickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setenteredTitle(enteredText);
  }

  function takeImageHandler(imageUri) {
    setselectedImage(imageUri);
  }

  //prevent loop
  const pickLocationHandler = useCallback((location) => {
    setpickedLocation(location);
  }, []);

  async function savePlaceHandler() {
    if (enteredTitle && selectedImage && pickedLocation) {
      const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
      await insertPlace(placeData);
      navigation.navigate("AllPlaces");
    } else {
      !enteredTitle && Alert.alert("Invalid input", "please input the title");
      !selectedImage && Alert.alert("Invalid input", "please take the picture");
      !pickedLocation &&
        Alert.alert("Invalid input", "please pick the location");
    }
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <View style={styles.buttonContainer}>
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </View>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: GlobalColors.cultured,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 6,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.jet,
    backgroundColor: GlobalColors.blueYonder,
    color: GlobalColors.cultured,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 12,
    marginBottom: 60,
    // backgroundColor: "red",
  },
});
