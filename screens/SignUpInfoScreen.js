import { WebBrowser } from 'exponent';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons } from '@exponent/vector-icons';

import * as Animatable from 'react-native-animatable';
import InfoOverlayContainer from '../components/InfoOverlayContainer';
import NextButton from '../components/NextButton';
import AbsolutePositionedAboveKeyboard
  from '../components/AbsolutePositionedAboveKeyboard';
import Colors from '../constants/Colors';

class Checkbox extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        hitSlop={{ top: 10, left: 25, right: 40, bottom: 20 }}>
        <View
          style={[
            sstyles.checkbox,
            this.props.checked && sstyles.checked,
            this.props.error && !this.props.checked && sstyles.error,
          ]}>
          {this.props.checked && this._renderIcon()}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderIcon = () => {
    return (
      <Ionicons
        name="md-checkmark"
        size={13}
        color="#fff"
        style={{ backgroundColor: 'transparent' }}
      />
    );
  };
}

const sstyles = StyleSheet.create({
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 4,
    borderColor: '#DCDEE4',
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    borderColor: Colors.inputError,
  },
  checked: {
    backgroundColor: '#46B5E8',
    borderColor: '#46B5E8',
  },
});

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
    let { invalidFirstName, invalidLastName, invalidEmail } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.nameContainer,
              (invalidFirstName || invalidLastName) &&
                styles.invalidInputBorder,
            ]}>
            <View style={styles.firstNameContainer}>
              <TextInput
                autoFocus
                ref={view => {
                  this._firstName = view;
                }}
                placeholderTextColor={
                  invalidFirstName ? Colors.inputError : Colors.placeholderText
                }
                onSubmitEditing={() => this._lastName.focus()}
                onChangeText={firstName =>
                  this._handleChangeText({ firstName })}
                value={this.state.firstName}
                style={[
                  styles.textInput,
                  invalidFirstName && styles.invalidInput,
                ]}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="First name"
              />
            </View>

            <View style={styles.lastNameContainer}>
              <TextInput
                ref={view => {
                  this._lastName = view;
                }}
                value={this.state.lastName}
                onChangeText={lastName => this._handleChangeText({ lastName })}
                placeholderTextColor={
                  invalidLastName ? Colors.inputError : Colors.placeholderText
                }
                onSubmitEditing={() => this._email.focus()}
                style={[
                  styles.textInput,
                  invalidLastName && styles.invalidInput,
                ]}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="Last name"
              />
            </View>

            <View style={styles.iconContainer}>
              <Image
                style={[
                  styles.icon,
                  {
                    tintColor: invalidFirstName || invalidLastName
                      ? Colors.inputError
                      : Colors.text,
                  },
                ]}
                source={require('../assets/Onboarding - Icon - Profile.png')}
              />
            </View>
          </View>

          <View
            style={[
              styles.emailContainer,
              invalidEmail && styles.invalidInputBorder,
            ]}>
            <View style={styles.emailInputContainer}>
              <TextInput
                ref={view => {
                  this._email = view;
                }}
                value={this.state.email}
                onChangeText={email => this._handleChangeText({ email })}
                onSubmitEditing={this._handleSubmit}
                placeholderTextColor={
                  invalidEmail ? Colors.inputError : Colors.placeholderText
                }
                style={[styles.textInput, invalidEmail && styles.invalidInput]}
                returnKeyType="next"
                keyboardType="email-address"
                blurOnSubmit={false}
                placeholder="Email"
              />
            </View>

            <View style={styles.iconContainer}>
              <Image
                style={[
                  styles.icon,
                  { tintColor: invalidEmail ? Colors.inputError : Colors.text },
                ]}
                source={require('../assets/Onboarding - Icon - Email.png')}
              />
            </View>
          </View>

          <View style={styles.agreeContainer}>
            <Checkbox
              onPress={this._handlePressTosCheckbox}
              checked={this.state.tosChecked}
              error={this.state.invalidTos}
            />
            <Text style={[styles.normalText, { marginLeft: 10 }]}>
              I agree to Lyft's{' '}
              <Text style={styles.linkText} onPress={this._goToTos}>
                Terms of Service
              </Text>
            </Text>
          </View>
        </View>

        <AbsolutePositionedAboveKeyboard>
          <NextButton onPress={this._handleSubmit} />
        </AbsolutePositionedAboveKeyboard>
      </View>
    );
  }

  _handlePressTosCheckbox = () => {
    this.setState({ tosChecked: !this.state.tosChecked });
  };

  _goToTos = () => {
    WebBrowser.openBrowserAsync('https://www.lyft.com/terms');
  };

  _handleChangeText = nextState => {
    nextState = { ...this.state, ...nextState };
    this.setState(nextState);
    this._validate({ unsetOnly: true, state: nextState });
  };

  _validate = (opts = { unsetOnly: false, state: this.state }) => {
    let nextState = {};
    let { state } = opts;
    if (state.firstName) {
      nextState.invalidFirstName = false;
    } else if (!opts.unsetOnly) {
      nextState.invalidFirstName = true;
    }

    if (state.lastName) {
      nextState.invalidLastName = false;
    } else if (!opts.unsetOnly) {
      nextState.invalidLastName = true;
    }

    // super dumb validation just for demo
    if (state.email && state.email.match('@')) {
      nextState.invalidEmail = false;
    } else if (!opts.unsetOnly) {
      nextState.invalidEmail = true;
    }

    if (state.tosChecked) {
      nextState.invalidTos = false;
    } else if (!opts.unsetOnly) {
      nextState.invalidTos = true;
    }

    this.setState(nextState);
    return !nextState.invalidEmail &&
      !nextState.invalidFirstName &&
      !nextState.invalidLastName &&
      !nextState.invalidTos;
  };

  _handleSubmit = () => {
    if (this.state.submitting) {
      return;
    }

    if (!this._validate()) {
      return;
    }

    this.setState({
      submitting: true,
    });

    InfoOverlayContainer.updateStatus('saving');

    // let's just pretend
    setTimeout(
      () => {
        InfoOverlayContainer.updateStatus(null);
        this.props.navigation.navigate('DoneScreen');
      },
      1500
    );
  };
}

const genericContainer = {
  flexDirection: 'row',
  borderWidth: StyleSheet.hairlineWidth * 2,
  borderColor: '#DCDEE4',
  borderRadius: 4,
  marginHorizontal: 15,
  height: 40,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  agreeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 5,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
  icon: {
    resizeMode: 'center',
    width: 22,
    height: 22,
  },
  nameContainer: {
    ...genericContainer,
    marginTop: 5,
    marginBottom: 13,
  },
  firstNameContainer: {
    marginLeft: 40,
    flex: 1,
  },
  lastNameContainer: {
    marginLeft: 15,
    flex: 1,
  },
  emailContainer: {
    ...genericContainer,
  },
  emailInputContainer: {
    marginLeft: 40,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
  },
  linkText: {
    fontSize: 13,
    color: Colors.pink,
  },
  normalText: {
    fontSize: 13,
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
