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
import delay from 'delay';
import ResponsiveImage from '@exponent/react-native-responsive-image';

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
            top: height - 50 - m,
            left: 0,
            height: 50 + m,
            marginBottom: m,
            width,
            backgroundColor: 'transparent',
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('Button pressed');
              navigate(
                this.state.askLocation
                  ? 'LocationPermissionScreen'
                  : 'EnterPhoneNumberScreen'
              );
            }}
            activeOpacity={0.6}
            style={{
              marginHorizontal: m,
              marginBottom: m,
              height: 50,
              borderRadius: 6,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.pink,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
