import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from '@firebase/app';
import '@firebase/auth';

class SplashScreen extends Component {
  componentWillMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //if user is logged in, send them to the main scene
          console.log('Already Logged in');
          Actions.reset('main');
          Actions.main();
        } else {
          //this sends the user to the login scene
          console.log('Not Logged');
          Actions.reset('auth');
          Actions.auth();
        }
      });
    }, 2000);
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Image style={styles.imageStyle} source={require('../assets/Manager-512.png')} />
      </View>

    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    height: 128,
    width: 128
  }
};

export default SplashScreen;
