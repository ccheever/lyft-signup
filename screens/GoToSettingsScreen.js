import Exponent from 'exponent';
import React from 'react';
import {
  AppState,
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
import { NavigationActions } from 'react-navigation';

const { height, width } = Dimensions.get('window');

export default class GoToSettingsScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  componentWillMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = async currentState => {
    if (currentState === 'active') {
      let { status } = await Exponent.Permissions.getAsync(
        Exponent.Permissions.LOCATION
      );

      if (status === 'granted') {
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'SplashScreen' }),
            NavigationActions.navigate({ routeName: 'SignupStack' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          height,
          width,
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            marginTop: 22,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 22,
              color: 'black',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: 14,
              marginTop: 14,
            }}>Turn on Location</Text>
          <Text
            style={{
              color: '#333333',
              fontSize: 13,
              textAlign: 'center',
            }}>We can't pick you up if we don't know where you are! Go to Settings, select 'Privacy', then 'Location Services'</Text>
        </View>
        <View
          style={{
            flex: 1,
            width,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Image
            source={require(
              '../assets/Onboarding - Location - Settings@2x.png'
            )}
            style={{
              width: 523 / 2,
              height: 854 / 2,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('Touched that settings thing');
            // iOS only :/
            Linking.openURL('app-settings:');
          }}
          activeOpacity={0.8}>
          <View
            style={{
              backgroundColor: '#FF00BB',
              justifyContent: 'center',
              alignItems: 'center',
              height: 66,
              width,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
              }}>Go to 'Settings'</Text>
          </View>
        </TouchableOpacity>
        <StatusBar barStyle="default" hidden={false} />
      </View>
    );
  }
}
