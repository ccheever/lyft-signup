import Exponent from 'exponent';
import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import ResponsiveImage from '@exponent/react-native-responsive-image';

var {height, width} = Dimensions.get('window');

const PINK = '#ff00fe';

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  }

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
      Exponent.Asset.fromModule(require('./assets/glow_launchscreen@2x.png')).downloadAsync(),
      Exponent.Asset.fromModule(require('./assets/logo_launchscreen@3x.png')).downloadAsync(),
      Exponent.Asset.fromModule(require('./assets/logo_launchscreen@2x.png')).downloadAsync(),
      Exponent.Asset.fromModule(require('./assets/intro_video.mov')).downloadAsync(),
      Exponent.Asset.fromModule(require('./assets/Onboarding - Location - Background@2x.png')).downloadAsync(),
      Exponent.Asset.fromModule(require('./assets/Onboarding - Location - Background@3x.png')).downloadAsync(),
    ]);

    this.setState({appIsReady: true});
  }
}


class LocationPermissionScreen extends React.Component {

  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  render() {
    return (
      <ResponsiveImage
        sources={{
          2: require('./assets/Onboarding - Location - Background@2x.png'),
          3: require('./assets/Onboarding - Location - Background@3x.png'),
        }}
        style={{
          flex: 1,
          width,
          height,
        }}
      />
    );
  }
}

class InitialScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  render() {
    let m = 15;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} animated={true} />
        <Exponent.Components.Video
          source={require('./assets/intro_video.mov')}
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
      <View style={{
          position: 'absolute',
          top: 50,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          width,
        }}>
        <ResponsiveImage
          sources={{
            // The values are anything that Image's source prop accepts
            2: require('./assets/logo_launchscreen@2x.png'),
            3: require('./assets/logo_launchscreen@3x.png'),
          }}
          style={{
            height: 138 / 2.475,
            width: 198 / 2.475,
          }}
        />
        </View>
        <View style={{
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
              console.log("Button pressed");
              navigate('LocationPermissionScreen');
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
              backgroundColor: PINK,
          }}>
            <Text style={{
                color: 'white',
                fontSize: 18,
            }}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

import {
  StackNavigator,
} from 'react-navigation';

const BasicApp = StackNavigator({
  InitialScreen: {screen: InitialScreen},
  LocationPermissionScreen: {screen: LocationPermissionScreen},
}, {
  headerMode: 'screen',
  navigationOptions: {
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Exponent.registerRootComponent(AppContainer);
