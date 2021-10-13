import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapViewScreen = (props) => {
  const initialCordinates = props.navigation.getParam("cordinates");
  const [selectedCordinates, setCordinates] = useState(initialCordinates);

  const mapRegion = {
    latitude: selectedCordinates ? selectedCordinates.latitude : 37.78,
    longitude: selectedCordinates ? selectedCordinates.longitude : -122.43,
    latitudeDelta: 0.015 * 5,
    longitudeDelta: 0.0121 * 5,
  };

  const handleMapEvent = (event) => {
    setCordinates({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const saveSelectedLocation = useCallback(() => {
    console.log(selectedCordinates);
    if (!selectedCordinates) {
      return;
    }
    props.navigation.navigate("AddPlace", {
      selectedLocation: {
        latitude: selectedCordinates.latitude,
        longitude: selectedCordinates.longitude,
      },
    });
  }, [selectedCordinates]);

  useEffect(() => {
    console.log("map use effect....");
    props.navigation.setParams({
      saveLocation: saveSelectedLocation,
    });
  }, [saveSelectedLocation]);

  return (
    <MapView
      style={styles.view}
      region={mapRegion}
      onPress={handleMapEvent}
      mapType="standard"
    >
      {selectedCordinates && (
        <Marker coordinate={selectedCordinates} title="Place Address" />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

MapViewScreen.navigationOptions = (navData) => {
  const saveLocation = navData.navigation.getParam("saveLocation");
  return {
    headerTitle: "Select Location",
    headerRight: () => (
      <Button title="Save" color="white" onPress={saveLocation} />
    ),
  };
};
export default MapViewScreen;
