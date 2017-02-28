import Exponent from 'exponent';
import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import TouchableNativeFeedback
  from '@exponent/react-native-touchable-native-feedback-safe';

const { height, width } = Dimensions.get('window');

export default class SplashScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  state = {
    askLocation: true,
  };

  async componentWillMount() {
    let { status } = await Exponent.Permissions.getAsync(
      Exponent.Permissions.LOCATION
    );

    this.setState({ askLocation: false });
  }

  render() {
    let m = 15;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} animated={true} />
        <Exponent.Components.Video
          source={require('../assets/intro_video.mov')}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          repeat
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 50,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            left: 0,
            width,
          }}>
          <Image
            source={require('../assets/logo_launchscreen.png')}
            style={{
              height: 138 / 2.475,
              width: 198 / 2.475,
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            left: m,
            right: m,
            bottom: m,
            backgroundColor: 'transparent',
            borderRadius: 6,
            overflow: 'hidden',
            backgroundColor: Colors.pink,
          }}>
          <TouchableNativeFeedback
            onPress={this._handlePressGetStarted}
            delayPressIn={16}
            fallback={TouchableHighlight}
            underlayColor="#BF1094"
            style={{
              flex: 1,
              height: 55,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}>Get started</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }

  _handlePressGetStarted = () => {
    this.props.navigation.navigate(
      this.state.askLocation ? 'LocationPermissionScreen' : 'SignupStack'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
