import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux'
import MapsActions from '../store/state/MapsState';

const HomeScreen = ({search, searchResults}) => {
  useEffect(() => {
    search('büyük');
  }, []);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <SafeAreaView style={{flex: 1}} >

    </SafeAreaView>
  )
};

const mapStateToProps = state => {
  return {
    searchResults: state.maps.searchResults,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: searchInput => dispatch(MapsActions.search(searchInput)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
