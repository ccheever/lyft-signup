import Exponent from 'exponent';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import GoToSettingsScreen from './screens/GoToSettingsScreen';
import EnterPhoneNumberScreen from './screens/EnterPhoneNumberScreen';
import SplashScreen from './screens/SplashScreen';
import LocationPermissionScreen from './screens/LocationPermissionScreen';
import CountryPickerScreen from './screens/CountryPickerScreen';

function downloadAssetsAsync(assets) {
  return assets.map(asset => Exponent.Asset.fromModule(asset).downloadAsync());
}

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  render() {
    if (!this.state.appIsReady) {
      return <Exponent.Components.AppLoading />;
    }

    return <RootNavigation />;
  }

  async _loadAssetsAsync() {
    await Promise.all(
      downloadAssetsAsync([
        require('./assets/glow_launchscreen@2x.png'),
        require('./assets/logo_launchscreen@3x.png'),
        require('./assets/logo_launchscreen@2x.png'),
        require('./assets/intro_video.mov'),
        require('./assets/Onboarding - Location - Background@2x.png'),
        require('./assets/Onboarding - Location - Background@3x.png'),
        require('./assets/Onboarding - Location - Background blurred@2x.png'),
        require('./assets/Onboarding - Location - Background blurred@3x.png'),
        require('./assets/Onboarding - Location - Arrow@2x.png'),
      ])
    );

    this.setState({ appIsReady: true });
  }
}

const MainStack = StackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    LocationPermissionScreen: { screen: LocationPermissionScreen },
    GoToSettingsScreen: { screen: GoToSettingsScreen },
    EnterPhoneNumberScreen: { screen: EnterPhoneNumberScreen },
  },
  {
    headerMode: 'screen',
    initialRouteName: 'EnterPhoneNumberScreen',
    navigationOptions: {
      header: {
        titleStyle: {
          fontSize: 20,
          color: '#3B3D51',
        },
        style: {
          backgroundColor: '#fff',
          borderWidth: 0,
          height: 70,
        },
      },
    },
  }
);

const CountryModalStack = StackNavigator(
  {
    CountryPicker: { screen: CountryPickerScreen },
  },
  {
    mode: 'modal',
    initialRouteName: 'CountryPicker',
  }
);

const RootNavigation = StackNavigator(
  {
    MainStack: {
      name: 'Main',
      screen: MainStack,
    },
    CountryModalStack: {
      name: 'LocationModals',
      screen: CountryModalStack,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

Exponent.registerRootComponent(AppContainer);
