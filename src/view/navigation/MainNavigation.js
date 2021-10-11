import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './../HomeScreen';
import VideoScreen from './../VideoScreen';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ColorScheme from '../../utils/ColorScheme';

const MainStack = createStackNavigator();

const MainNavigation = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: ColorScheme.primary,
        },
        headerTitleStyle: {
          color: ColorScheme.text
        }
      }}
      initialRouteName={'home'}>
      <MainStack.Screen
        path={'home'}
        name={'Home Page'}
        component={HomeScreen}
      />
      <MainStack.Screen path={'video'} name={'Video'} component={VideoScreen} />
    </MainStack.Navigator>
  );
};

MainStack.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(MainNavigation);
