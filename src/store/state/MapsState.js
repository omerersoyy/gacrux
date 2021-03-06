import {createActions, createReducer} from 'reduxsauce/lib/reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  search: ['searchInput'],
  searchSuccess: ['searchResults'],
  searchError: ['error'],
  resetSearchState: null,
  getPlaceDetails: ['placeId'],
  getPlaceDetailsSuccess: ['placeDetails'],
  getPlaceDetailsError: ['error'],
  setSelectedPlace: ['location'],
});

const INITIAL_STATE = Immutable({
  searchInput: '',
  error: '',
  fetching: false,
  searchResults: [],
  selectedPlace: {
    placeId: null,
    lat: null,
    lng: null,
  },
});

export const MapsActionTypes = Types;
export default Creators;

export const search = (state, {searchInput}) => {
  return state.merge({
    fetching: !INITIAL_STATE.fetching,
    error: INITIAL_STATE.error,
    searchInput,
  });
};

export const searchSuccess = (state, {searchResults}) => {
  return state.merge({
    fetching: INITIAL_STATE.fetching,
    searchResults,
  });
};

export const searchError = (state, {error}) => {
  return state.merge({
    fetching: INITIAL_STATE.fetching,
    error,
  });
};

export const resetSearchState = state => {
  return state.merge({
    searchResults: INITIAL_STATE.searchResults,
    searchInput: '',
    error: '',
    fetching: false,
  });
};

export const setSelectedPlace = (state, {location}) =>
  state.merge({selectedPlace: {placeId: null, ...location}});

export const getPlaceDetails = (state, {placeId}) => {
  return state.merge({
    fetching: !INITIAL_STATE.fetching,
    selectedPlace: INITIAL_STATE.selectedPlace,
    placeId,
  });
};

export const getPlaceDetailsSuccess = (state, {placeDetails}) => {
  return state.merge({
    fetching: INITIAL_STATE.fetching,
    selectedPlace: placeDetails,
  });
};

export const getPlaceDetailsError = (state, {error}) => {
  return state.merge({
    fetching: INITIAL_STATE.fetching,
    error,
  });
};

export const mapsReducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH]: search,
  [Types.SEARCH_SUCCESS]: searchSuccess,
  [Types.SEARCH_ERROR]: searchError,
  [Types.RESET_SEARCH_STATE]: resetSearchState,
  [Types.SET_SELECTED_PLACE]: setSelectedPlace,
  [Types.GET_PLACE_DETAILS]: getPlaceDetails,
  [Types.GET_PLACE_DETAILS_SUCCESS]: getPlaceDetailsSuccess,
  [Types.GET_PLACE_DETAILS_ERROR]: getPlaceDetailsError,
});
