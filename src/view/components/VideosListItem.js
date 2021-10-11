import ColorScheme from '../../utils/ColorScheme';
import React from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export const VideosListItem = ({defaultThumbnail, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <Image
        style={style.image}
        source={{
          uri: defaultThumbnail?.url,
        }}
      />
      <Text style={style.title}>{title}</Text>
      <View style={style.overlay}>
        <Icon
          style={{
            marginBottom: 9,
          }}
          name="play-circle"
          size={40}
          color={ColorScheme.text}
        />
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 11,
    backgroundColor: ColorScheme.charcoal,
  },
  text: {
    color: ColorScheme.text,
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    color: ColorScheme.text,
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ColorScheme.background,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
