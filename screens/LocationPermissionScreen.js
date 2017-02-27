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

export default class LocationPermissionScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  state = {
    askForLocation: false,
  };

  async componentDidMount() {
    this.setState({ askForLocation: true });
    let { status } = await Exponent.Permissions.askAsync(
      Exponent.Permissions.LOCATION
    );

    if (status === 'granted') {
      this.props.navigation.navigate('EnterPhoneNumberScreen');
    } else {
      console.log('not granted');
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.askForLocation) {
      return (
        <View
          style={{
            height,
            width,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Image
              source={require(
                '../assets/Onboarding - Location - Background blurred.png'
              )}
              style={{
                position: 'absolute',
                height,
                width,
                top: 0,
                left: 0,
              }}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <View
                style={{
                  height: 184, //(256 / 1024 * height), // / 2,
                  width: 272, //(376 / 576) * width, // 378 / 2,
                  backgroundColor: 'transparent',
                }}>
                <Image
                  source={require(
                    '../assets/Onboarding - Location - Arrow.png'
                  )}
                  style={{
                    width: 84 / 2,
                    height: 144 / 2,
                    position: 'absolute',
                    top: 184,
                    marginTop: 15 + 30,
                    marginLeft: 272 / 4 - 84 / 2 / 2,
                    left: 272 / 2,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              marginBottom: 40 / 2.5,
              marginHorizontal: 40 / 2.5,
            }}>
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: 21,
                fontWeight: 'bold',
                color: 'white',
              }}>Your location is needed to find nearby drivers</Text>
          </View>
        </View>
      );
    } else {
      return (
        <Image
          source={require('../assets/Onboarding - Location - Background.png')}
          style={{
            flex: 1,
            width,
            height,
          }}
        />
      );
    }
  }
}
