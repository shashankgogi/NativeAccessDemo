import React, { useState } from "react";
import { StyleSheet, Image, Alert, View, Text, Button } from "react-native";
import * as ImagePick from "expo-image-picker";
import Colors from "../constants/Colors";
import * as FileSystem from "expo-file-system";

const ImgPicker = (props) => {
  const [imgUri, setImgUri] = useState(null);
  const onImgPickerCliked = async () => {
    const respose = await ImagePick.requestCameraRollPermissionsAsync();
    if (respose.status != "granted") {
      Alert.alert(
        "Permission",
        "Need to give permission to access your camera/library",
        [{ text: "Okay" }]
      );
      return;
    }

    const image = await ImagePick.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    console.log(image);
    if (!image.cancelled) {
      setImgUri(image.uri);
      props.onImgSelect(image.uri);
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.imageContainer}>
        {imgUri == null ? (
          <Text>No Image Added</Text>
        ) : (
          <Image style={styles.image} source={{ uri: imgUri }} />
        )}
      </View>
      <View style={styles.button}>
        <Button
          title="Take Picture"
          color="white"
          onPress={onImgPickerCliked}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  button: {
    backgroundColor: Colors.primaryColor,
    width: "100%",
    marginVertical: 5,
  },
});

export default ImgPicker;
