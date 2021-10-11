import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import MapsActions from '../store/state/MapsState';
import VideosActions from '../store/state/VideosState';
import ColorScheme from '../utils/ColorScheme';
import {SearchResultsListItem} from './components/SearchResultsListItem';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {VideosListItem} from './components/VideosListItem';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {LoadingIndicator} from './components/LoadingIndicator';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const HomeScreen = ({
  search,
  places,
  videos,
  selectedPlace,
  getPlaceDetails,
  resetSearchState,
  searchVideosByLocation,
  fetching,
  nextPageToken,
}) => {
  useEffect(() => {
    const {lat, lng} = selectedPlace;
    lat && lng && searchVideosByLocation(`${lat},${lng}`);
  }, [selectedPlace]);

  useEffect(() => {
    setShowModal(true);
  }, [videos]);

  const nav = useNavigation();
  const navState = useNavigationState(state => state);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = input => {
    if (input.length > 3) {
      search(input);
      return;
    }
    resetSearchState();
  };

  const handleClearInput = () => {
    inputRef?.current.clear();
    resetSearchState();
  };

  const handlePressSearchResultItem = placeId => {
    getPlaceDetails(placeId);
    resetSearchState();
    inputRef?.current?.blur();
  };

  const handleOnEndReached = () => {
    const {lat, lng} = selectedPlace;
    lat && lng && searchVideosByLocation(`${lat},${lng}`, nextPageToken);
  };

  const modalHeader = () => (
    <View style={[styles.modalHeader, { backgroundColor: ColorScheme.charcoal }]}>
      <Text style={styles.modalHeaderTitle}>Related Videos</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {fetching && <LoadingIndicator />}
      <KeyboardAvoidingView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: ColorScheme.secondary
          }}>
          <TextInput
            clearTextOnFocus
            ref={inputRef}
            style={styles.input}
            placeholder={'Search for a place...'}
            placeholderTextColor={ColorScheme.charcoal}
            onChangeText={handleSearch}
          />
          <TouchableWithoutFeedback onPress={handleClearInput}>
            <Icon
              style={{marginRight: 5}}
              name="trash"
              size={30}
              color={ColorScheme.charcoal}
            />
          </TouchableWithoutFeedback>
        </View>
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
          <View style={styles.mapViewContainer}>
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: selectedPlace.lat,
                longitude: selectedPlace.lng,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
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
          transparent
          visible={videos.length > 0 && navState?.index === 0 && showModal}>
          <View style={styles.modalContentWrapper}>
            <TouchableOpacity
              style={{height: 350}}
              onPress={() => {
                setShowModal(false);
                inputRef?.current?.blur();
              }}
            />
            <View style={styles.modalContent}>
              <FlatList
                stickyHeaderIndices={[0]}
                ListHeaderComponent={modalHeader}
                data={videos}
                onEndReached={handleOnEndReached}
                onEndReachedThreshold={0.2}
                renderItem={({item}) => (
                  <VideosListItem
                    {...item}
                    onPress={() => {
                      nav.navigate('Video', {
                        videoId: item.videoId,
                      });
                    }}
                  />
                )}
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.background,
  },
  input: {
    flex: 1,
    height: 50,
    margin: 7,
    color: ColorScheme.text,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: ColorScheme.charcoal,
  },
  resultsContainer: {
    backgroundColor: ColorScheme.info,
    justifyContent: 'center',
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
    justifyContent: 'flex-start',
  },
  modalContent: {
    height: Dimensions.get('window').height - 350,
    backgroundColor: ColorScheme.charcoal,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 13,
    justifyContent: 'center',
  },
  modalHeaderTitle: {
    fontSize: 19,
    color: ColorScheme.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapViewContainer: {
    height: 400,
  },
});

const mapStateToProps = state => {
  return {
    places: state.maps.searchResults,
    selectedPlace: state.maps.selectedPlace,
    videos: state.videos.searchResults,
    fetching: state.maps.fetching || state.videos.fetching,
    nextPageToken: state.videos.nextPageToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: searchInput => dispatch(MapsActions.search(searchInput)),
    getPlaceDetails: placeId => dispatch(MapsActions.getPlaceDetails(placeId)),
    resetSearchState: () => dispatch(MapsActions.resetSearchState()),
    searchVideosByLocation: (location, nextPageToken) =>
      dispatch(VideosActions.searchVideosByLocation(location, nextPageToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
