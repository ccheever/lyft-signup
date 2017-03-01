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
import CurrentRouteEmitter from '../util/CurrentRouteEmitter';

export default class VerifyPhoneNumberScreen extends React.Component {
  static navigationOptions = {
    title: 'Verify phone number',
  };

  state = {
    code: '',
    invalid: false,
  };

  componentDidMount() {
    this._mounted = true;
    this._subscription = CurrentRouteEmitter.addListener(
      'change',
      routeName => {
        if (routeName === 'VerifyPhoneNumberScreen') {
          this._mounted && this._input.focus();
        }
      }
    );

    InfoOverlayContainer.updateStatus('code-sent');

    setTimeout(
      () => {
        InfoOverlayContainer.updateStatus(null);
      },
      2000
    );
  }

  componentWillUnmount() {
    this._mounted = false;
    this._subscription.remove();
    InfoOverlayContainer.updateStatus(null);
  }

  render() {
    let { params } = this.props.navigation.state;

    let countryCode = '+1';
    let phoneNumber = '(778) 899-8725';
    if (params) {
      countryCode = params.countryCode;
      phoneNumber = params.phoneNumber;
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {this._renderCodeInput()}
          <Text style={styles.normalText}>
            Enter the code sent to {formatPhoneNumber(phoneNumber, countryCode)}
          </Text>
          {this._renderResendButton()}
          {this._renderProblemsLink()}
        </View>

        <AbsolutePositionedAboveKeyboard>
          <NextButton onPress={() => this._handleSubmit(this.state.code)} />
        </AbsolutePositionedAboveKeyboard>
        <TextInput
          blurOnSubmit={false}
          autoFocus
          ref={view => {
            this._input = view;
          }}
          onChangeText={this._handleChangeCode}
          keyboardType="number-pad"
          style={styles.hiddenInput}
          value={this.state.code}
          maxLength={4}
        />
      </View>
    );
  }

  _renderProblemsLink = () => {
    return (
      <View style={{ marginTop: 25, alignItems: 'center' }}>
        <Text
          style={{ color: Colors.pink, fontSize: 14 }}
          onPress={this._handlePressProblems}>
          Problems receiving the code?
        </Text>
      </View>
    );
  };

  _handlePressProblems = () => {
    console.log('do nothing atm');
  };

  _renderResendButton = () => {
    return (
      <TouchableHighlight
        onPress={this._handlePressResend}
        style={styles.resendCodeButton}>
        <Text style={styles.resendCodeText}>
          Resend code
        </Text>
      </TouchableHighlight>
    );
  };

  _handlePress = () => {
    // do nothing?
  };

  _handleChangeCode = code => {
    if (this.state.submitting) {
      return;
    }

    this.setState({ code, invalid: false });

    if (code.length === 4) {
      this._handleSubmit(code);
    }
  };

  _handleSubmit = code => {
    if (this.state.submitting) {
      return;
    }

    InfoOverlayContainer.updateStatus('verifying');
    this.setState({ submitting: true });

    setTimeout(
      () => {
        if (code === '2052') {
          this.setState({ invalid: false, submitting: false });
          requestAnimationFrame(() => {
            this.props.navigation.navigate('SignUpInfoScreen');
            InfoOverlayContainer.updateStatus('verified');
          });
        } else {
          this.setState({ invalid: true, submitting: false });
          InfoOverlayContainer.updateStatus(null);
        }
      },
      1000
    );
  };

  _renderCodeInput = () => {
    return (
      <View style={styles.codeInputContainer}>
        {[0, 1, 2, 3].map(this._renderCodeSlot)}
      </View>
    );
  };

  _renderCodeSlot = i => {
    let digit = this.state.code[i];
    let { invalid } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this._refocus} key={i}>
        <View style={[styles.codeSlot, invalid && styles.codeSlotInvalid]}>
          <Animatable.Text
            style={[
              styles.codeDigitText,
              digit && styles.codeDigitTextVisible,
              invalid && styles.invalidInput,
            ]}
            duration={125}
            transition={['opacity']}
            useNativeDriver>
            {digit}
          </Animatable.Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  _refocus = () => {
    this._input.focus();
  };
}

function formatPhoneNumber(phoneNumber, countryCode) {
  phoneNumber = phoneNumber.replace(/[\(\)]/g, '').replace(' ', '-');
  return `${countryCode} ${phoneNumber}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 40,
  },
  codeDigitText: {
    color: Colors.text,
    fontSize: 44,
    textAlign: 'center',
    flex: 1,
    opacity: 0,
  },
  codeDigitTextVisible: {
    opacity: 1,
  },
  codeSlot: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.text,
    width: 45,
    height: 50,
    marginHorizontal: 5,
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
  codeSlotInvalid: {
    borderBottomColor: Colors.inputError,
  },
  hiddenInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 1,
    color: '#fff',
  },
  resendCodeText: {
    textAlign: 'center',
    fontSize: 22,
  },
  resendCodeButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.text,
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 13,
    alignSelf: 'center',
    marginTop: 15,
  },
});
