import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedBars } from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Settings'
  });

  render() {
    return(
      <View style={{ marginTop: 10 }}>
        <Button
          title="Reset Liked Bars"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={this.props.clearLikedBars}
        />
      </View>
    );
  }
}

export default connect(null, { clearLikedBars })(SettingsScreen);
