import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { GlobalColors } from "../../constant/global-colors";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      android_ripple={{ color: GlobalColors.cultured }}
      onPress={onSelect.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 8,
    // marginHorizontal: 8,
    backgroundColor: GlobalColors.blueYonder,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
    // padding: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    flex: 1,
    borderRadius: 4,
    height: "100%",
    padding: 12,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: GlobalColors.cultured,
  },
  address: {
    fontSize: 12,
    color: GlobalColors.cultured,
  },
});
