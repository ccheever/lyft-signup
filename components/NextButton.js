import { TouchableHighlight, View, Text } from 'react-native';
import React from 'react';
import TouchableNativeFeedback
  from '@exponent/react-native-touchable-native-feedback-safe';

export default class NextButton extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#FE17C5',
          flex: 1,
        }}>
        <TouchableNativeFeedback
          fallback={TouchableHighlight}
          delayPressIn={16}
          underlayColor="#BB0E90"
          onPress={this.props.onPress}
          style={{
            height: 62,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: '#fff', fontSize: 22 }}>
            Next
          </Text>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
