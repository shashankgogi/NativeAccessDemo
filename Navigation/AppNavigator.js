import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import PlaceListScreen from "../screens/PlacesListScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";
import MapViewScreen from "../screens/MapViewScreen";
import Colors from "../constants/Colors";

const AppNavigation = createStackNavigator(
  {
    PlaceList: PlaceListScreen,
    PlaceDetail: PlaceDetailsScreen,
    AddPlace: AddPlaceScreen,
    MapView: MapViewScreen,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigation);

export default AppContainer;
