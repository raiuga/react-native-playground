import React, { Component } from 'react';
import { View, Text, ScrollView, Platform, Linking } from 'react-native';
import { Button, Card, Rating, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Review Bars',
    headerRight: (
      <Button
        title='Settings'
        onPress={() => navigation.navigate('settings')}
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(0,122,255,1)'
      />
    )
  });

  goToMaps = (region) => {
    const { latitude, longitude } = region;
    let urlToMaps = Platform.OS === 'android' ? `geo:${latitude},${longitude}` : `http://maps.apple.com/?ll=${latitude},${longitude}`;
    return urlToMaps;
  };

  renderLikesBars() {
    return this.props.likedBars.map(bar => {

      const initialRegion = {
        longitude: bar.geometry.location.lng,
        latitude: bar.geometry.location.lat,
        longitudeDelta: 0.0045,
        latitudeDelta: 0.002
      };

      return (
        <Card title={bar.name} key={bar.id}>

          <View style={{ height: 250 }}>
            {/* Map */}
            <MapView
              initialRegion={initialRegion}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              liteMode
              style={{ flex:1 }}
            >
              <MapView.Marker coordinate={initialRegion} />
            </MapView>


          {/* Rating */}
          {/* <View>
            <Text>Rating:</Text>
            <View>
              <Rating
                imageSize={15}
                readonly
                startingValue={bar.rating}
              />
              <Text>({bar.rating}/5)</Text>
            </View>
          </View> */}

            <View style={{ marginTop: 10, justifyContent: 'space-between' }}>
              {/* Address */}
              <Text style={{ textAlign: 'center' }}>{bar.vicinity}</Text>

              {/* Go to */}
              <Button
                title="Go To"
                backgroundColor="#03A9F4"
                icon={{name: 'map'}}
                onPress={() => Linking.openURL(this.goToMaps(initialRegion))}
              />
            </View>

          </View>

        </Card>
      );
    });
  }

  render() {
    return(
      <ScrollView>
        {this.renderLikesBars()}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return { likedBars: state.likedBars };
}

export default connect(mapStateToProps)(ReviewScreen);
