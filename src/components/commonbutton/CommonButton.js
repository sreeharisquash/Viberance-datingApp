import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CommonButton = ({ bgColor, label, color, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Text style={{ color: color }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8D00C5",
    paddingHorizontal: 10,
    paddingVertical: 18,
    alignItems: "center",
    borderRadius: 75,
  },
});

export default CommonButton;
