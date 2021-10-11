import {call, put, delay} from 'redux-saga/effects';
import MapsActions from '../state/MapsState';
const R = require('ramda');

export function* search(client, {searchInput}) {
  yield delay(1000);
  const response = yield call(client.search, searchInput);

  if (response.ok) {
    let result = R.pathOr([], ['data', 'predictions'], response).map(
      (v, _k) => {
        return {
          placeId: R.pathOr('', ['place_id'], v),
          description: R.pathOr('', ['description'], v),
        };
      },
    );

    yield put(MapsActions.searchSuccess(result));
  } else {
    yield put(MapsActions.searchError(response.error));
  }
}

export function* getPlaceDetails(client, {placeId}) {
  const response = yield call(client.getDetailsById, placeId);

  if (response.ok) {
    let result = R.pathOr(
      null,
      ['data', 'result', 'geometry', 'location'],
      response,
    );

    yield put(MapsActions.getPlaceDetailsSuccess({...result, placeId}));
  } else {
    yield put(MapsActions.getPlaceDetailsError(response.error));
  }
}
