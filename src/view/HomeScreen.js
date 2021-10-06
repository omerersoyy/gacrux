import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import MapsActions from '../store/state/MapsState';
import VideosActions from '../store/state/VideosState';
import ColorScheme from '../utils/ColorScheme';
import {SearchResultsListItem} from './components/SearchResultsListItem';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  View,
  Modal,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {VideosListItem} from './components/VideosListItem';

const HomeScreen = ({
  search,
  places,
  videos,
  selectedPlace,
  getPlaceDetails,
  resetSearchState,
  searchVideosByLocation,
}) => {
  useEffect(() => {
    const {lat, lng} = selectedPlace;
    lat && lng && searchVideosByLocation(`${lat},${lng}`);
  }, [selectedPlace]);

  const handleSearch = input => {
    if (input.length > 3) {
      search(input);
    }
  };

  const handlePressSearchResultItem = placeId => {
    getPlaceDetails(placeId);
    resetSearchState();
  };

  const modalHeader = () => (
    <View
      style={{
        padding: 13,
        justifyContent: 'center',
        backgroundColor: ColorScheme.secondary,
      }}>
      <Text
        style={{
          fontSize: 19,
          color: ColorScheme.text,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Related Videos
      </Text>
    </View>
  );

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
          {places.map((v, k) => {
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
                draggable
                onDragEnd={e => {
                  const {latitude, longitude} = e.nativeEvent?.coordinate;
                  const locationString = `${latitude},${longitude}`;
                  searchVideosByLocation(locationString);
                }}
                coordinate={{
                  latitude: selectedPlace.lat,
                  longitude: selectedPlace.lng,
                }}
              />
            </MapView>
          </View>
        )}
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={videos?.length > 0}>
          <View style={styles.modalContentWrapper}>
            <View style={styles.modalContent}>
              {videos.length > 0 && (
                <FlatList
                  stickyHeaderIndices={[0]}
                  ListHeaderComponent={modalHeader}
                  data={videos}
                  renderItem={({item}) => <VideosListItem {...item} />}
                />
              )}
            </View>
          </View>
        </Modal>
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
  modal: {
    margin: 0,
  },
  modalContentWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: Dimensions.get('window').height - 350,
    backgroundColor: ColorScheme.primary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

const mapStateToProps = state => {
  return {
    places: state.maps.searchResults,
    selectedPlace: state.maps.selectedPlace,
    videos: state.videos.searchResults,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: searchInput => dispatch(MapsActions.search(searchInput)),
    getPlaceDetails: placeId => dispatch(MapsActions.getPlaceDetails(placeId)),
    resetSearchState: () => dispatch(MapsActions.resetSearchState()),
    searchVideosByLocation: location =>
      dispatch(VideosActions.searchVideosByLocation(location)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
