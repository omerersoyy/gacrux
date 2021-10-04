import {all, takeLatest} from 'redux-saga/effects';
import {MapsActionTypes} from '../state/MapsState';
import {search} from './MapsSaga';
import {getMapsApi} from '../../model/api/maps/MapsApi';

const mapsClient = getMapsApi();

export default function* root() {
  yield all([takeLatest(MapsActionTypes.SEARCH, search, mapsClient)]);
}
