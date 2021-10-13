import { ADD_PLACE, SET_PLACES } from "./places-action";
import Place from "../models/Place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES: {
      return {
        places: action.places.map(
          (p1) =>
            new Place(p1.id.toString(), p1.title, p1.image, p1.lat, p1.long)
        ),
      };
    }
    case ADD_PLACE: {
      return {
        places: state.places.concat(
          new Place(
            action.placeData.id.toString(),
            action.placeData.title,
            action.placeData.imageUri,
            action.placeData.lat,
            action.placeData.long
          )
        ),
      };
    }

    default: {
      return state;
    }
  }
};
