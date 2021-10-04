import {combineReducers} from 'redux';
import rootSaga from '../middleware';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

export const reducers = combineReducers({

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
