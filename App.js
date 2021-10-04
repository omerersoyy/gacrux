import React from 'react';
import createStore from './src/store';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native';
import HomeScreen from './src/view/HomeScreen';

const {store} = createStore();

const Root = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

export default Root;
