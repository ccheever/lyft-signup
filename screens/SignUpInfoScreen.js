import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import InfoOverlayContainer from '../components/InfoOverlayContainer';
import NextButton from '../components/NextButton';
import AbsolutePositionedAboveKeyboard
  from '../components/AbsolutePositionedAboveKeyboard';
import Colors from '../constants/Colors';

export default class SignUpInfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign up',
  };

  state = {
    firstName: '',
    lastName: '',
    email: '',
    agreeToTerms: false,
  };

  componentDidMount() {
    this._mounted = true;
    InfoOverlayContainer.updateStatus('verified');

    setTimeout(
      () => {
        InfoOverlayContainer.updateStatus(null);
      },
      1000
    );
  }

  componentWillUnmount() {
    this._mounted = false;
    InfoOverlayContainer.updateStatus(null);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer} />

        <AbsolutePositionedAboveKeyboard>
          <NextButton onPress={this._handleSubmit} />
        </AbsolutePositionedAboveKeyboard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  normalText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#3B3D51',
  },
  invalidInput: {
    color: Colors.inputError,
  },
  invalidInputBorder: {
    borderColor: Colors.inputError,
  },
});
