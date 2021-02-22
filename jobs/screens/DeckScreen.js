import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import { Card, Button, Rating, Icon } from 'react-native-elements';
import { MapView, Constants } from 'expo';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Bars',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={30} color={tintColor} />;
    }
  };

  renderCard = (bar) => {
    const initialRegion = {
      longitude: bar.geometry.location.lng,
      latitude: bar.geometry.location.lat,
      longitudeDelta: 0.0045,
      latitudeDelta: 0.002
    };

    const barStatus = (bar.opening_hours && bar.opening_hours.open_now) ? 'Open' : 'Closed';

    return (
      <Card title={bar.name}>
        <View style={{ height: 300 }}>
          <MapView
            initialRegion={initialRegion}
            cacheEnabled={Platform.OS === 'android'}
            liteMode
            scrollEnabled={false}
            style={{ flex:1 }}
          >
            <MapView.Marker coordinate={initialRegion} />
          </MapView>
        </View>


        <View style={styles.bottomContainer}>
          {/* Rating */}
          <View>
            <Text style={styles.cardText}>Rating:</Text>
            <View style={styles.ratingContainer}>
              <Rating
                imageSize={15}
                readonly
                startingValue={bar.rating}
              />
              <Text style={styles.ratingText}>({bar.rating}/5)</Text>
            </View>
          </View>
          {/* isOpen? */}
          <View>
            <Text style={styles.cardText}>Current State:</Text>
            <Text style={styles.cardText}>{barStatus}</Text>
          </View>
        </View>
      </Card>
    );
  };

  renderNoMoreCards = () => {
    return (
      <Card title="No more bars" style={{ marginTop: 30 }}>
        <Button
          title="Back to Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    )
  }

  render() {
    return(
      <View style={styles.topViewStyle}>
        <Swipe
          data={this.props.bars}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={bar => this.props.likeBar(bar)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  topViewStyle: {
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  cardText: {
    color: 'gray',
    fontSize: 12
  },
  ratingText: {
    paddingLeft: 10,
    color: 'gray',
    fontSize: 10
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};

const mapStateToProps = ({ bars }) => {
  return { bars: bars.results };
};

export default connect(mapStateToProps, actions)(DeckScreen);
