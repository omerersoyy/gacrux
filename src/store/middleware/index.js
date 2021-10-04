import {all, takeLatest} from 'redux-saga/effects';
import {MapsActionTypes} from '../state/MapsState';
import { getPlaceDetails, search } from "./MapsSaga";
import {getMapsApi} from '../../model/api/maps/MapsApi';

const mapsClient = getMapsApi();

export default function* root() {
  yield all([
    takeLatest(MapsActionTypes.SEARCH, search, mapsClient),
    takeLatest(MapsActionTypes.GET_PLACE_DETAILS, getPlaceDetails, mapsClient)
  ]);
}
