import Exponent, { WebBrowser } from 'exponent';
import React from 'react';
import {
  Alert,
  Image,
  Keyboard,
  LayoutAnimation,
  ScrollView,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@exponent/vector-icons';
import { AsYouTypeFormatter } from 'google-libphonenumber';
import * as Animatable from 'react-native-animatable';

import Colors from '../constants/Colors';
import NextButton from '../components/NextButton';
import AbsolutePositionedAboveKeyboard
  from '../components/AbsolutePositionedAboveKeyboard';
import InfoOverlayContainer from '../components/InfoOverlayContainer';
import { CardStack } from 'react-navigation';
import sendSmsAsync from '../util/sendSmsAsync';
import NavigationOptions from '../constants/NavigationOptions';
import CurrentRouteEmitter from '../util/CurrentRouteEmitter';

export default class EnterPhoneNumberScreen extends React.Component {
  static navigationOptions = {
    title: 'Get started',
    ...NavigationOptions.Signup,
    header: navigation => ({
      ...NavigationOptions.Signup.header,
      left: (
        <CardStack.Header.BackButton
          tintColor={Colors.text}
          onPress={() => navigation.goBack(null)}
        />
      ),
    }),
  };

  state = {
    countryCode: '+1',
    phoneNumber: '',
    invalid: false,
  };

  componentDidMount() {
    this._mounted = true;
    this._subscription = CurrentRouteEmitter.addListener(
      'change',
      routeName => {
        if (routeName === 'EnterPhoneNumberScreen') {
          this._mounted && this._input.focus();
        }
      }
    );
  }

  componentWillUnmount() {
    this._mounted = false;
    this._subscription.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.normalText, { marginBottom: 15 }]}>
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

        </View>

        <AbsolutePositionedAboveKeyboard>
          <TouchableOpacity
            style={styles.logInWithFacebookContainer}
            onPress={this._handlePressFacebook}>
            <Text style={styles.normalText}>
              Or log in with{' '}
              <Text style={styles.facebookLink}>
                Facebook
              </Text>
            </Text>
          </TouchableOpacity>

          <NextButton onPress={this._handleSubmit} />
        </AbsolutePositionedAboveKeyboard>

        <StatusBar hidden={false} barStyle="default" />
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
              {this.state.countryCode}
            </Text>
          </View>
          <TextInput
            blurOnSubmit={false}
            autoFocus
            ref={view => {
              this._input = view;
            }}
            placeholderTextColor={
              invalid ? Colors.inputError : Colors.placeholderText
            }
            onChangeText={this._handleChangePhoneNumber}
            keyboardType="number-pad"
            style={[styles.phoneNumberInput, invalid && styles.invalidInput]}
            placeholder="(204) 234-5678"
            value={this.state.phoneNumber}
          />
        </View>
      </View>
    );
  };

  _handlePressFacebook = async () => {
    const APP_ID = `1796012677385195`;
    const REDIRECT_URI = `https://redirect-with-params-vfvpjgoosz.now.sh/facebook`;
    // const REDIRECT_URI = Exponent.Constants.Manifest.xde
    //   ? `https://redirect-with-params-rvlxfreejn.now.sh/facebook`
    //   : `https://redirect-with-params-vfvpjgoosz.now.sh/facebook`;
    Linking.addEventListener('url', this._handleFacebookRedirect);

    let result = await WebBrowser.openBrowserAsync(
      `https://www.facebook.com/v2.8/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}`
    );

    Linking.removeEventListener('url', this._handleFacebookRedirect);

    if (result.type === 'cancel') {
      this._input.focus();
    }
  };

  _handleFacebookRedirect = async event => {
    WebBrowser.dismissBrowser();
    setTimeout(
      () => {
        Alert.alert(
          'Facebook auth successful',
          'But for this demo we do not do anything with the token',
          [
            {
              text: 'Okay',
              onPress: () => this._input.focus(),
            },
          ],
          { cancelable: false }
        );
      },
      1000
    );
  };

  _handleSubmit = async () => {
    const DEBUG_SKIP = false;

    let { phoneNumber, countryCode } = this.state;
    if (!DEBUG_SKIP && !phoneNumber.match(/^\(\d+\) \d{3}-\d{4}$/)) {
      requestAnimationFrame(() => this._textInputContainer.shake(500));
      this.setState({ invalid: true });
    } else {
      InfoOverlayContainer.updateStatus('verifying');

      try {
        let result = await sendSmsAsync(phoneNumber, countryCode);
        this.props.navigation.navigate('VerifyPhoneNumberScreen', {
          countryCode,
          phoneNumber,
        });
      } catch (e) {
        alert('error');
        console.log({ e });
        InfoOverlayContainer.updateStatus(null);
      }
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
    paddingTop: 5,
    backgroundColor: '#fff',
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
