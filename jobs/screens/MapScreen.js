import React, { Component } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView, Constants } from 'expo';
import { connect } from 'react-redux';

import * as actions from '../actions';

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    }
  };

  state = {
    mapLoaded: false,
    region: {
      longitude: -9.1488357,
      latitude: 38.7288763,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  };

  componentDidMount = () => {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchBars(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  render() {

    if(!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.topViewStyle}>
        <MapView
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={{ flex: 1 }}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title='Search This Area'
            backgroundColor='#009688'
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  topViewStyle: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
}

export default connect(null, actions)(MapScreen);
