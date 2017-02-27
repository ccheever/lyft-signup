import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

import AbsolutePositionedAboveKeyboard from './AbsolutePositionedAboveKeyboard';

export default class InfoOverlay extends React.Component {
  render() {
    return (
      <AbsolutePositionedAboveKeyboard
        pointerEvents={this.props.status ? 'auto' : 'none'}
        style={{ top: 0, opacity: this.props.status ? 1 : 0 }}>
        <View
          style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
          ]}>
          {this.props.status === 'verifying' && this._renderVerifying()}
          {this.props.status === 'code-sent' && this._renderCodeSent()}
        </View>
      </AbsolutePositionedAboveKeyboard>
    );
  }

  _renderVerifying = () => {
    return (
      <View style={styles.infoContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.infoText}>Verifying</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  infoContainer: {
    paddingTop: 20,
    paddingBottom: 17,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(99,98,101,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
});
