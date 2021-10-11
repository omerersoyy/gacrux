import {createActions, createReducer} from 'reduxsauce/lib/reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  searchVideosByLocation: ['location', 'nextPageToken'],
  searchVideosByLocationSuccess: ['searchResults', 'nextPageToken'],
  searchVideosByLocationError: ['error'],
  resetVideosSearchState: null,
});

const INITIAL_STATE = Immutable({
  error: '',
  fetching: false,
  searchResults: [],
  location: null,
  nextPageToken: null,
});

export const VideosActionTypes = Types;
export default Creators;

export const searchVideosByLocation = (state, {location, nextPageToken}) => {
  return state.merge({
    fetching: !INITIAL_STATE.fetching,
    error: INITIAL_STATE.error,
    location,
    nextPageToken,
  });
};

export const searchVideosByLocationSuccess = (
  state,
  {searchResults, nextPageToken},
) => {
  return state.merge({
    fetching: INITIAL_STATE.fetching,
    searchResults,
    nextPageToken,
  });
};

export const searchVideosByLocationError = (state, {error}) => {
  return state.merge({
    fetching: INITIAL_STATE.fetching,
    error,
  });
};

export const resetVideosSearchState = state => {
  return state.merge({
    searchResults: INITIAL_STATE.searchResults,
    location: null,
    error: '',
    fetching: false,
  });
};

export const videosReducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_VIDEOS_BY_LOCATION]: searchVideosByLocation,
  [Types.SEARCH_VIDEOS_BY_LOCATION_SUCCESS]: searchVideosByLocationSuccess,
  [Types.SEARCH_VIDEOS_BY_LOCATION_ERROR]: searchVideosByLocationError,
  [Types.RESET_VIDEOS_SEARCH_STATE]: resetVideosSearchState,
});
