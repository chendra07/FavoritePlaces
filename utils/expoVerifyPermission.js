import { Alert } from "react-native";

const expoVerifyPermission = async (
  permissionInformation,
  permissionStatus,
  requestPermission
) => {
  if (permissionInformation.status === permissionStatus.UNDETERMINED) {
    const permissionResponse = await requestPermission();

    return permissionResponse.granted;
  }

  if (permissionInformation.status === permissionStatus.DENIED) {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant the permissions to use this app."
    );

    return false;
  }

  return true;
};

export default expoVerifyPermission;
