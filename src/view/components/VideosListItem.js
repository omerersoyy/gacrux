import ColorScheme from '../../utils/ColorScheme';
import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';

export const VideosListItem = ({
  defaultThumbnail,
  title,
  videoId,
  description,
}) => {
  return (
    <TouchableOpacity style={style.container}>
      <Image
        style={{
          width: '100%',
          height: 200,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: ColorScheme.background,
        }}
        source={{
          uri: defaultThumbnail?.url,
        }}
      />
      <Text style={style.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 7,
  },
  text: {
    color: ColorScheme.text,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: ColorScheme.text,
    marginTop: 5,
  },
});
