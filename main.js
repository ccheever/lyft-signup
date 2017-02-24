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
  View
} from 'react-native';

import Colors from './constants/Colors';
import delay from 'delay';
import ResponsiveImage from '@exponent/react-native-responsive-image';

const { height, width } = Dimensions.get('window');

import GoToSettingsScreen from './screens/GoToSettingsScreen';
import InitialScreen from './screens/InitialScreen';
import LocationPermissionScreen from './screens/LocationPermissionScreen';

class AppContainer extends React.Component {
  state = {
    appIsReady: false
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  render() {
    if (!this.state.appIsReady) {
      return <Exponent.Components.AppLoading />;
    }

    return <BasicApp />;
  }

  async _loadAssetsAsync() {
    await Promise.all([
      Exponent.Asset
        .fromModule(require('./assets/glow_launchscreen@2x.png'))
        .downloadAsync(),
      Exponent.Asset
        .fromModule(require('./assets/logo_launchscreen@3x.png'))
        .downloadAsync(),
      Exponent.Asset
        .fromModule(require('./assets/logo_launchscreen@2x.png'))
        .downloadAsync(),
      Exponent.Asset
        .fromModule(require('./assets/intro_video.mov'))
        .downloadAsync(),
      Exponent.Asset
        .fromModule(
          require('./assets/Onboarding - Location - Background@2x.png')
        )
        .downloadAsync(),
      Exponent.Asset
        .fromModule(
          require('./assets/Onboarding - Location - Background@3x.png')
        )
        .downloadAsync(),
      Exponent.Asset
        .fromModule(
          require('./assets/Onboarding - Location - Background blurred@2x.png')
        )
        .downloadAsync(),
      Exponent.Asset
        .fromModule(
          require('./assets/Onboarding - Location - Background blurred@3x.png')
        )
        .downloadAsync(),
      Exponent.Asset
        .fromModule(require('./assets/Onboarding - Location - Arrow@2x.png'))
        .downloadAsync()
    ]);

    this.setState({ appIsReady: true });
  }
}

import { StackNavigator } from 'react-navigation';

const BasicApp = StackNavigator(
  {
    InitialScreen: { screen: InitialScreen },
    LocationPermissionScreen: { screen: LocationPermissionScreen },
    GoToSettingsScreen: { screen: GoToSettingsScreen }
  },
  {
    headerMode: 'screen',
    navigationOptions: {}
  }
);

Exponent.registerRootComponent(AppContainer);
