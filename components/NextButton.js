import { View, Text } from 'react-native';
import React from 'react';

export default class NextButton extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#FE17C5',
          flex: 1,
          height: 65,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: '#fff', fontSize: 22 }}>
          Next
        </Text>
      </View>
    );
  }
}
