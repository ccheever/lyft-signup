import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import InfoOverlayContainer from '../components/InfoOverlayContainer';

export default class VerifyPhoneNumberScreen extends React.Component {
  static navigationOptions = {
    title: 'Verify phone number',
  };

  componentDidMount() {
    this._mounted = true;
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
    InfoOverlayContainer.updateStatus(null);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrolllView: {
    flex: 1,
  },
});
