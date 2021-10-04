import React from 'react';
import createStore from './src/store';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native';

const {store} = createStore();

const Root = () => (
  <Provider store={store}>
    <SafeAreaView />
  </Provider>
);

export default Root;
