import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import MapsActions from '../store/state/MapsState';
import ColorScheme from '../utils/ColorScheme';
import {SearchResultsListItem} from './components/SearchResultsListItem';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const HomeScreen = ({
  search,
  searchResults,
  selectedPlace,
  getPlaceDetails,
  resetSearchState
}) => {
  const handleSearch = input => {
    if (input.length > 3) {
      search(input);
    }
  };

  const handlePressSearchResultItem = placeId => {
    getPlaceDetails(placeId);
    resetSearchState();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: ColorScheme.background,
      }}>
      <KeyboardAvoidingView>
        <TextInput
          style={styles.input}
          placeholder={'Search for a place...'}
          placeholderTextColor={ColorScheme.text}
          onChangeText={handleSearch}
        />
        <View style={styles.resultsContainer}>
          {searchResults.map((v, k) => {
            const {placeId, description} = v;
            return (
              <SearchResultsListItem
                key={placeId}
                description={description}
                onPress={() => handlePressSearchResultItem(placeId)}
              />
            );
          })}
        </View>
        {selectedPlace?.placeId !== null && (
          <View style={{height: 300}}>
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: selectedPlace.lat,
                longitude: selectedPlace.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: selectedPlace.lat,
                  longitude: selectedPlace.lng,
                }}
              />
            </MapView>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 9,
    color: ColorScheme.text,
    borderRadius: 5,
    backgroundColor: ColorScheme.secondary,
    padding: 10,
    fontSize: 16,
  },
  resultsContainer: {
    backgroundColor: ColorScheme.info,
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  placeholder: {
    color: ColorScheme.text,
  },
});

const mapStateToProps = state => {
  return {
    searchResults: state.maps.searchResults,
    selectedPlace: state.maps.selectedPlace,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: searchInput => dispatch(MapsActions.search(searchInput)),
    getPlaceDetails: placeId => dispatch(MapsActions.getPlaceDetails(placeId)),
    resetSearchState: () => dispatch(MapsActions.resetSearchState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
