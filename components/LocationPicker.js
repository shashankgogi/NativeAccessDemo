import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import * as Location from "expo-location";
import Colors from "../constants/Colors";
import * as Permissions from "expo-permissions";

const LocationPicker = (props) => {
  const [selectedCordinates, setCoridinates] = useState();
  const validatePermissions = async () => {
    const result = await Location.requestPermissionsAsync(Permissions.LOCATION);
    if (result.status != "granted") {
      Alert.alert(
        "Don't have permisions",
        "Need to give permision or pick from map",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const fetchCurrentLocation = async () => {
    // setCoridinates(null);
    const result = validatePermissions();
    if (!result) {
      return;
    }
    const loactionResult = await Location.getCurrentPositionAsync({
      timeInterval: 5000,
    });
    setCoridinates({
      cordinates: {
        lat: loactionResult.coords.latitude,
        long: loactionResult.coords.longitude,
      },
    });

    console.log("in fetch");
  };

  const navigateToMapScreen = () => {
    props.navigation.navigate(
      "MapView",
      selectedCordinates && {
        cordinates: {
          latitude: selectedCordinates.cordinates.lat,
          longitude: selectedCordinates.cordinates.long,
        },
      }
    );
  };

  const { onSelectLocation } = props;

  useEffect(() => {
    if (selectedCordinates == null) {
      return;
    }
    onSelectLocation(
      selectedCordinates.cordinates.lat,
      selectedCordinates.cordinates.long
    );
  }, [selectedCordinates, onSelectLocation]);

  return (
    <View style={styles.mainView}>
      <View style={styles.mapViewContainer}>
        {selectedCordinates ? (
          <Text>
            {selectedCordinates.cordinates.lat +
              "," +
              selectedCordinates.cordinates.long}
          </Text>
        ) : (
          <Text>No Location Selelcted</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Get Current Location"
            color="white"
            onPress={fetchCurrentLocation}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Pick From Map"
            color="white"
            onPress={navigateToMapScreen}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  mapViewContainer: {
    borderColor: "gray",
    height: 200,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },

  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    // backgroundColor: "red",
  },
  button: {
    backgroundColor: Colors.primaryColor,
    // padding: 5,
  },
});

export default LocationPicker;
