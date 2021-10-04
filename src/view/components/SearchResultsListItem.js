import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import ColorScheme from '../../utils/ColorScheme';
import React from 'react';

export const SearchResultsListItem = ({description, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <Text style={style.text}>{description}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    height: 40,
  },
  text: {
    color: ColorScheme.text,
  },
});
