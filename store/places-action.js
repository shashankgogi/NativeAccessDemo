import * as FileSystem from "expo-file-system";
import { insertPlaces, fetchPlaces } from "../helper/db";
export const SET_PLACES = "SET_PLACES";
export const ADD_PLACE = "ADD_PLACE";
export const addPlaceAction = (title, imageUri, lat, long) => {
  return async (dispatch) => {
    try {
      let fileName = imageUri.split("/").pop();
      const imgPath = FileSystem.documentDirectory + fileName;
      await FileSystem.moveAsync({ from: imageUri, to: imgPath });
      const dbResult = await insertPlaces(title, imgPath, "address", lat, long);

      // console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          imageUri: imgPath,
          lat,
          long,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fetchPlacesAction = () => {
  return async (dispatch) => {
    const dbResult = await fetchPlaces();
    // console.log(dbResult);
    dispatch({ type: SET_PLACES, places: dbResult.rows._array });
  };
};
