import {combineReducers} from 'redux';
import rootSaga from '../store/middleware';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {mapsReducer} from './state/MapsState';
import {videosReducer} from './state/VideosState';

export const reducers = combineReducers({
  maps: mapsReducer,
  videos: videosReducer,
});

const initializeStore = (rootReducer, rootSaga) => {
  const middleware = [];
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  const store = createStore(rootReducer, applyMiddleware(...middleware));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default () => {
  let store = initializeStore(reducers, rootSaga);

  return {
    store,
  };
};
