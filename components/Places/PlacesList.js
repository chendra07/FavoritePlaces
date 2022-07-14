import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "./PlaceItem";
import { GlobalColors } from "../../constant/global-colors";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }) => {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate("PlaceDetails", { placeId: id });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        style={styles.list}
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaceItem place={item} onSelect={selectPlaceHandler} />
        )}
      />
    </View>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 16,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
    color: GlobalColors.cultured,
  },
});
