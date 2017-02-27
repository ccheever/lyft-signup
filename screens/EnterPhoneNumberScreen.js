import React from 'react';
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
import { AsYouTypeFormatter } from 'google-libphonenumber';
import * as Animatable from 'react-native-animatable';

import Colors from '../constants/Colors';
import NextButton from '../components/NextButton';
import AbsolutePositionedAboveKeyboard
  from '../components/AbsolutePositionedAboveKeyboard';

export default class EnterPhoneNumberScreen extends React.Component {
  static navigationOptions = {
    title: 'Get started',
  };

  state = {
    phoneNumber: '',
    invalid: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1 }}>
          <Text style={[styles.normalText, { marginBottom: 12 }]}>
            Get riding within minutes
          </Text>
          <Animatable.View
            ref={view => {
              this._textInputContainer = view;
            }}
            useNativeDriver>
            {this._renderPhoneNumberInput()}
          </Animatable.View>

          <Text style={[styles.normalText, { marginTop: 12 }]}>
            We'll send you a text to verify your phone
          </Text>

        </ScrollView>

        <AbsolutePositionedAboveKeyboard>
          <View style={styles.logInWithFacebookContainer}>
            <Text style={styles.normalText}>
              Or log in with{' '}
              <Text onPress={() => {}} style={styles.facebookLink}>
                Facebook
              </Text>
            </Text>
          </View>

          <NextButton onPress={this._handleSubmit} />
        </AbsolutePositionedAboveKeyboard>
      </View>
    );
  }

  _renderPhoneNumberInput = () => {
    let { invalid } = this.state;

    return (
      <View style={styles.phoneNumberContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate('CountryModalStack');
          }}>
          <View
            style={[
              styles.countryPickerContainer,
              invalid && { borderRightColor: Colors.inputError },
            ]}>
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
            <Text
              style={[
                styles.normalText,
                styles.countryCode,
                invalid && styles.invalidInput,
              ]}>
              +1
            </Text>
          </View>
          <TextInput
            autoFocus
            placeholderTextColor={
              invalid ? Colors.inputError : Colors.placeholderText
            }
            onChangeText={this._handleChangePhoneNumber}
            keyboardType="numeric"
            style={[styles.phoneNumberInput, invalid && styles.invalidInput]}
            placeholder="(204) 234-5678"
            value={this.state.phoneNumber}
          />
        </View>
      </View>
    );
  };

  _handleSubmit = () => {
    let { phoneNumber } = this.state;
    if (!phoneNumber.match(/^\(\d+\) \d{3}-\d{4}$/)) {
      requestAnimationFrame(() => this._textInputContainer.shake(500));
      this.setState({ invalid: true });
    } else {
      // TODO: Go to next!
    }
  };

  _handleChangePhoneNumber = value => {
    this.setState({ phoneNumber: formatPhoneNumber(value), invalid: false });
  };
}

function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return '';
  }

  const formatter = new AsYouTypeFormatter('US');
  let result;
  phoneNumber.match(/\d/g).forEach(number => {
    result = formatter.inputDigit(number);
  });

  return result;
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
    borderRightWidth: StyleSheet.hairlineWidth,
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
    fontWeight: '400',
    fontSize: 16,
  },
  phoneNumberInput: {
    width: 200,
    fontSize: 16,
    paddingTop: 2,
    fontWeight: '400',
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
  invalidInput: {
    color: Colors.inputError,
  },
});
