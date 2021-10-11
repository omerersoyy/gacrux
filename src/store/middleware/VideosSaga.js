import {call, put, select} from 'redux-saga/effects';
import VideosActions from '../state/VideosState';
const R = require('ramda');

export function* searchVideosByLocation(client, {location, nextPageToken}) {
  const response = yield call(client.searchByLocation, location, nextPageToken);
  const previousVideos = !nextPageToken
    ? []
    : yield select(state => state.videos.searchResults);

  if (response.ok) {
    let token = R.pathOr(null, ['data', 'nextPageToken'], response);
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

    yield put(
      VideosActions.searchVideosByLocationSuccess(
        [...previousVideos, ...result],
        token,
      ),
    );
  } else {
    yield put(
      VideosActions.searchVideosByLocationSuccess([
        {
          videoId: 'asdsad',
          title: 'qweqweqweqweqweqw',
          defaultThumbnail: 'https://img.youtube.com/vi/o95T698swZc/0.jpg',
        },
      ]),
    );
    yield put(VideosActions.searchVideosByLocationError(response.error));
  }
}
