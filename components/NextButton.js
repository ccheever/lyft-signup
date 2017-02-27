import { TouchableHighlight, View, Text } from 'react-native';
import React from 'react';
import TouchableNativeFeedback
  from '@exponent/react-native-touchable-native-feedback-safe';

export default class NextButton extends React.Component {
  render() {
    return (
      <TouchableNativeFeedback
        fallback={TouchableHighlight}
        underlayColor="#BB0E90"
        onPress={this.props.onPress}
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
      </TouchableNativeFeedback>
    );
  }
}
