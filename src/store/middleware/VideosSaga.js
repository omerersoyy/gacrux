import {call, put} from 'redux-saga/effects';
import VideosActions from '../state/VideosState';
const R = require('ramda');

export function* searchVideosByLocation(client, {location}) {
  const response = yield call(client.searchByLocation, location);

  if (response.ok) {
    let result = R.pathOr([], ['data', 'items'], response).map((v, _k) => {
      let videoId = R.pathOr(null, ['id', 'videoId'], v);
      let title = R.pathOr(null, ['snippet', 'title'], v);
      let description = R.pathOr(null, ['snippet', 'description'], v);
      let defaultThumbnail = R.pathOr(
        null,
        ['snippet', 'thumbnails', 'medium'],
        v,
      );
      return {
        videoId,
        title,
        description,
        defaultThumbnail,
      };
    });

    console.log(result);

    yield put(VideosActions.searchVideosByLocationSuccess(result));
  } else {
    yield put(VideosActions.searchVideosByLocationError(response.error));
    console.log(response);
  }
}
