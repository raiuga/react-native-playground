// Import libraries for making a registerComponent
import React from 'react';
import { Platform, Text, View } from 'react-native';

// Make a component
const Header = (props) => {
  const { viewStyle, textStyle } = styles;

  return (
      <View style={viewStyle}>
        <Text style={textStyle}>{props.headerText}</Text>
      </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    ...Platform.select({
      ios: {
          paddingTop: 15,
          shadowOpacity: 0.2
      },
      android: { elevation: 10 }
    })
  },
  textStyle: {
    fontSize: 20
  }
};

// Make the component available to other parts of the app
export { Header };
