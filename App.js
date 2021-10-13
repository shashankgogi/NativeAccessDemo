import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AppNavigation from "./Navigation/AppNavigator";

import PlaceReducer from "./store/places-reducer";
import ReactThunk from "redux-thunk";
import { init } from "./helper/db";

export default function App() {
  init()
    .then(() => {
      console.log("Initilized successfuly....");
    })
    .catch((error) => {
      console.log("Falied To Initilized" + error);
    });
  const rootReducer = combineReducers({
    places: PlaceReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReactThunk));

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
