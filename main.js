import Exponent, { Font, Asset } from 'exponent';
import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@exponent/vector-icons';

import Colors from './constants/Colors';
import GoToSettingsScreen from './screens/GoToSettingsScreen';
import EnterPhoneNumberScreen from './screens/EnterPhoneNumberScreen';
import SplashScreen from './screens/SplashScreen';
import LocationPermissionScreen from './screens/LocationPermissionScreen';
import CountryPickerScreen from './screens/CountryPickerScreen';
import VerifyPhoneNumberScreen from './screens/VerifyPhoneNumberScreen';
import InfoOverlayContainer from './components/InfoOverlayContainer';

function downloadAssetsAsync(assets) {
  return assets.map(asset => Asset.fromModule(asset).downloadAsync());
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

    return (
      <View style={{ flex: 1 }}>
        <RootNavigation />
        <InfoOverlayContainer />
      </View>
    );
  }

  async _loadAssetsAsync() {
    await Promise.all([
      ...downloadAssetsAsync([
        require('./assets/glow_launchscreen@2x.png'),
        require('./assets/logo_launchscreen@3x.png'),
        require('./assets/logo_launchscreen@2x.png'),
        require('./assets/intro_video.mov'),
        require('./assets/Onboarding - Location - Background@2x.png'),
        require('./assets/Onboarding - Location - Background@3x.png'),
        require('./assets/Onboarding - Location - Background blurred@2x.png'),
        require('./assets/Onboarding - Location - Background blurred@3x.png'),
        require('./assets/Onboarding - Location - Arrow@2x.png'),
      ]),
      Font.loadAsync(Ionicons.font),
    ]);

    this.setState({ appIsReady: true });
  }
}

const MainStack = StackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    LocationPermissionScreen: { screen: LocationPermissionScreen },
    GoToSettingsScreen: { screen: GoToSettingsScreen },
    EnterPhoneNumberScreen: { screen: EnterPhoneNumberScreen },
    VerifyPhoneNumberScreen: { screen: VerifyPhoneNumberScreen },
  },
  {
    headerMode: 'screen',
    initialRouteName: 'SplashScreen',
    navigationOptions: {
      header: {
        tintColor: Colors.text,
        titleStyle: {
          fontSize: 20,
          color: Colors.text,
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
