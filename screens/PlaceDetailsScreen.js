import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailsScreen = () => {
  return (
    <View style={styles.view}>
      <Text>You Are In PlaceDetailsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlaceDetailsScreen;
