import {all, takeLatest} from 'redux-saga/effects';
import {MapsActionTypes} from '../state/MapsState';
import {getPlaceDetails, search} from './MapsSaga';
import {getMapsApi} from '../../model/api/maps/MapsApi';
import {getYoutubeApi} from '../../model/api/maps/YoutubeApi';
import {VideosActionTypes} from '../state/VideosState';
import {searchVideosByLocation} from './VideosSaga';

const mapsClient = getMapsApi();
const youtubeClient = getYoutubeApi();

export default function* root() {
  yield all([
    takeLatest(MapsActionTypes.SEARCH, search, mapsClient),
    takeLatest(MapsActionTypes.GET_PLACE_DETAILS, getPlaceDetails, mapsClient),
    takeLatest(
      VideosActionTypes.SEARCH_VIDEOS_BY_LOCATION,
      searchVideosByLocation,
      youtubeClient,
    ),
  ]);
}
