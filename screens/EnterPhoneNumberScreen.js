import {
  Image,
  Keyboard,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons } from '@exponent/vector-icons';
import Colors from '../constants/Colors';
import React from 'react';

class AbsolutePositionAboveKeyboard extends React.Component {
  state = {
    keyboardHeight: 0,
  };

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this._keyboardWillShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this._keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardWillShow = e => {
    LayoutAnimation.configureNext({
      duration: e.duration,
      update: {
        duration: e.duration,
        type: 'keyboard',
      },
    });
    this.setState({ keyboardHeight: e.endCoordinates.height });
  };

  _keyboardWillHide = () => {
    LayoutAnimation.configureNext({
      duration: 70,
      update: {
        duration: 70,
        type: 'keyboard',
      },
    });
    this.setState({ keyboardHeight: 0 });
  };

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: this.state.keyboardHeight,
          left: 0,
          right: 0,
        }}>
        {this.props.children}
      </View>
    );
  }
}

class NextButton extends React.Component {
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

export default class EnterPhoneNumberScreen extends React.Component {
  static navigationOptions = {
    title: 'Get started',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1 }}>
          <Text style={[styles.normalText, { marginBottom: 12 }]}>
            Get riding within minutes
          </Text>
          {this._renderPhoneNumberInput()}
          <Text style={[styles.normalText, { marginTop: 12 }]}>
            We'll send you a text to verify your phone
          </Text>

        </ScrollView>

        <AbsolutePositionAboveKeyboard>
          <View style={styles.logInWithFacebookContainer}>
            <Text style={styles.normalText}>
              Or log in with{' '}
              <Text onPress={() => {}} style={styles.facebookLink}>
                Facebook
              </Text>
            </Text>
          </View>

          <NextButton onPress={() => {}} />
        </AbsolutePositionAboveKeyboard>
      </View>
    );
  }

  _renderPhoneNumberInput = () => {
    return (
      <View style={styles.phoneNumberContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate('CountryModalStack');
          }}>
          <View style={styles.countryPickerContainer}>
            <Image
              style={{ width: 22, height: 13, resizeMode: 'contain' }}
              source={require('../assets/flags/CA.png')}
            />
            <Ionicons
              size={13}
              name="md-arrow-dropdown"
              style={{ marginLeft: 5 }}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.phoneNumberInputContainer}>
          <View style={styles.countryCodeContainer}>
            <Text style={[styles.normalText, styles.countryCode]}>+1</Text>
          </View>
          <TextInput
            autoFocus
            keyboardType="numeric"
            style={styles.phoneNumberInput}
            placeholder="(204) 234-5678"
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  facebookLink: {
    color: '#3EA7E6',
  },
  logInWithFacebookContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  countryPickerContainer: {
    borderRightWidth: 1,
    borderColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  countryCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 40,
  },
  countryCode: {
    fontWeight: '500',
    fontSize: 16,
  },
  phoneNumberInput: {
    width: 200,
    fontSize: 16,
    paddingTop: 2,
    fontWeight: '500',
  },
  phoneNumberInputContainer: {
    flexDirection: 'row',
  },
  normalText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#3B3D51',
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: '#E4E4E4',
    borderRadius: 4,
    marginHorizontal: 15,
  },
});
