import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, size, color, onPress, bordered = false }) => {
  return (
    <View
      style={[
        styles.buttonOuterContainer,
        bordered && [styles.borderButton, { borderColor: color }],
      ]}
    >
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
        android_ripple={{ color: "white" }}
      >
        <View style={styles.button}>
          <Ionicons name={icon} size={size} color={color} />
        </View>
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 2,
    // margin: 2,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    borderRadius: 30,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonOuterContainer: {
    overflow: "hidden",
    borderRadius: 30,
  },
  borderButton: {
    borderWidth: 1,
  },
});
