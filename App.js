import React from 'react';
import createStore from './src/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/view/navigation/MainNavigation';

const {store} = createStore();

const Root = () => (
  <NavigationContainer>
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  </NavigationContainer>
);

export default Root;
