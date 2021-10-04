import {call, put} from 'redux-saga/effects';
import MapsActions from '../state/MapsState';
const R = require('ramda');

export function* search(client, {searchInput}) {
  const response = yield call(client.search, searchInput);

  if (response.ok) {
    yield put(MapsActions.searchSuccess(response.data));
  } else {
    yield put(MapsActions.searchError(response.error));
  }
}
