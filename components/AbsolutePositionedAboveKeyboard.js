import React from 'react';
import { Keyboard, LayoutAnimation, View } from 'react-native';

export default class AbsolutePositionedAboveKeyboard extends React.Component {
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
        {...this.props}
        style={[
          this.props.style,
          {
            position: 'absolute',
            bottom: this.state.keyboardHeight,
            left: 0,
            right: 0,
          },
        ]}>
        {this.props.children}
      </View>
    );
  }
}
