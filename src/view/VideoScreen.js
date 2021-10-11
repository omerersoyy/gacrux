import React from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import WebView from 'react-native-webview';

const VideoScreen = ({route}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{
          uri: `https://www.youtube.com/watch?v=${route.params.videoId}`,
        }}
      />
    </SafeAreaView>
  );
};

export default connect()(VideoScreen);
