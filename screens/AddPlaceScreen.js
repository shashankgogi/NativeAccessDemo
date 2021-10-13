import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import * as PlaceActions from "../store/places-action";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const AddPlaceScreen = (props) => {
  let dispatch = useDispatch();

  const locationFromMap = props.navigation.getParam("selectedLocation");

  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const textChangeHandler = (text) => {
    setTitle(text);
  };

  const savePlaceDetails = () => {
    console.log(selectedLocation);
    dispatch(
      PlaceActions.addPlaceAction(
        title,
        imageUri,
        selectedLocation.latitude,
        selectedLocation.longitude
      )
    );
    props.navigation.goBack();
  };

  const onImagePick = (imageUri) => {
    setImageUri(imageUri);
  };

  useEffect(() => {
    setSelectedLocation(locationFromMap);
  }, [locationFromMap]);

  const locationSelectedFromMap = useCallback((lat, long) => {
    console.log(lat, long);
    setSelectedLocation({
      latitude: lat,
      longitude: long,
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.view}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={textChangeHandler}
          />
        </View>
        <ImagePicker onImgSelect={onImagePick} />
        <LocationPicker
          navigation={props.navigation}
          onSelectLocation={locationSelectedFromMap}
        />
        <View style={styles.button}>
          <Button title="Save Place" color="white" onPress={savePlaceDetails} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
  },
  input: {
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: Colors.primaryColor,
    width: "100%",
    marginVertical: 5,
  },
});

AddPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};
export default AddPlaceScreen;
