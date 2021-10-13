import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as PlacesActions from "../store/places-action";

const PlaceListScreen = () => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.places);
  // console.log(places);

  useEffect(() => {
    dispatch(PlacesActions.fetchPlacesAction());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <PlaceItem
            title={itemData.item.title}
            image={itemData.item.imageUri}
            address={itemData.item.lat + "," + itemData.item.long}
            onSelect={() => {
              console.log("list item selected");
            }}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({});

PlaceListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="ios-add"
          onPress={() => {
            navData.navigation.navigate("AddPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlaceListScreen;
