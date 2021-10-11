import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import ColorScheme from '../../utils/ColorScheme';

export const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={ColorScheme.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
});
