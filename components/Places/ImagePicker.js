import { StyleSheet, Text, View, Button, Alert, Image } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { GlobalColors } from "../../constant/global-colors";
import OutlineButton from "../UI/OutlineButton";
import expoVerifyPermission from "../../utils/expoVerifyPermission";

const ImagePicker = ({ onTakeImage }) => {
  const [pickedImage, setpickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    return await expoVerifyPermission(
      cameraPermissionInformation,
      PermissionStatus,
      requestPermission
    );
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    setpickedImage(image.uri);
    onTakeImage(image.uri);
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        ) : (
          <Text style={styles.fallbackText}>No image taken yet</Text>
        )}
      </View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalColors.spaceCadet,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalColors.cultured,
  },
});
