import Exponent, { Font, Asset } from 'exponent';
import React from 'react';
import { Keyboard, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@exponent/vector-icons';

import Colors from './constants/Colors';
import CountryPickerScreen from './screens/CountryPickerScreen';
import CurrentRouteEmitter from './util/CurrentRouteEmitter';
import EnterPhoneNumberScreen from './screens/EnterPhoneNumberScreen';
import GoToSettingsScreen from './screens/GoToSettingsScreen';
import SignUpInfoScreen from './screens/SignUpInfoScreen';
import InfoOverlayContainer from './components/InfoOverlayContainer';
import LocationPermissionScreen from './screens/LocationPermissionScreen';
import NavigationOptions from './constants/NavigationOptions';
import SplashScreen from './screens/SplashScreen';
import VerifyPhoneNumberScreen from './screens/VerifyPhoneNumberScreen';

function downloadAssetsAsync(assets) {
  return assets.map(asset => Asset.fromModule(asset).downloadAsync());
}

function hasChildNavigator(navigationState) {
  let child = navigationState.routes[navigationState.index];
  if (child.routes) {
    return true;
  } else {
    return false;
  }
}

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null;
  }

  if (hasChildNavigator(navigationState)) {
    let child = navigationState.routes[navigationState.index];
    return getCurrentScreen(child);
  } else {
    return navigationState.routes[navigationState.index].routeName;
  }
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
        <RootNavigation
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentScreen(currentState);
            const prevScreen = getCurrentScreen(prevState);

            if (prevScreen !== currentScreen) {
              CurrentRouteEmitter.emit('change', currentScreen);
            }
          }}
        />
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
        require('./assets/flags/CA.png'),
        require('react-navigation/src/views/assets/back-icon.png'),
      ]),
      Font.loadAsync(Ionicons.font),
    ]);

    this.setState({ appIsReady: true });
  }
}

const DEBUG_VERIFY = false;
const DEBUG_SIGNUP = DEBUG_VERIFY;

const SignupStack = StackNavigator(
  {
    EnterPhoneNumberScreen: { screen: EnterPhoneNumberScreen },
    VerifyPhoneNumberScreen: { screen: VerifyPhoneNumberScreen },
    SignUpInfoScreen: { screen: SignUpInfoScreen },
  },
  {
    headerMode: 'float',
    initialRouteName: 'EnterPhoneNumberScreen',
    navigationOptions: NavigationOptions.Signup,
    onTransitionEnd: opts => {},
    onTransitionStart: opts => {},
  }
);

const MainStack = StackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    LocationPermissionScreen: { screen: LocationPermissionScreen },
    GoToSettingsScreen: { screen: GoToSettingsScreen },
    SignupStack: { screen: SignupStack },
  },
  {
    headerMode: 'none',
    initialRouteName: DEBUG_SIGNUP ? 'SignupStack' : 'SplashScreen',
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
    initialRouteName: 'MainStack',
  }
);

Exponent.registerRootComponent(AppContainer);
