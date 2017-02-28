import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@exponent/vector-icons';

import AbsolutePositionedAboveKeyboard from './AbsolutePositionedAboveKeyboard';

export default class InfoOverlay extends React.Component {
  render() {
    return (
      <AbsolutePositionedAboveKeyboard
        pointerEvents="none"
        style={{ top: 0, opacity: this.props.status ? 1 : 0 }}>
        <View
          style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
          ]}>
          {this.props.status === 'verifying' && this._renderVerifying()}
          {this.props.status === 'verified' && this._renderVerified()}
          {this.props.status === 'code-sent' && this._renderCodeSent()}
          {this.props.status === 'saving' && this._renderSaving()}
        </View>
      </AbsolutePositionedAboveKeyboard>
    );
  }

  _renderCodeSent = () => {
    return (
      <View style={styles.infoContainerWide}>
        <Ionicons name="md-checkmark" color="white" size={50} />
        <Text style={[styles.infoText, { marginTop: 1 }]}>Code sent</Text>
      </View>
    );
  };

  _renderVerifying = () => {
    return (
      <View style={styles.infoContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.infoText}>Verifying</Text>
      </View>
    );
  };

  _renderVerified = () => {
    return (
      <View style={styles.infoContainerWide}>
        <Ionicons name="md-checkmark" color="white" size={50} />
        <Text style={[styles.infoText, { marginTop: 1 }]}>Verified</Text>
      </View>
    );
  };

  _renderSaving = () => {
    return (
      <View style={styles.infoContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.infoText}>Saving</Text>
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
  infoContainerWide: {
    paddingTop: 15,
    paddingBottom: 13,
    paddingHorizontal: 25,
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
