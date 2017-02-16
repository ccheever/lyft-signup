import Exponent from 'exponent';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
    ]);

    this.setState({appIsReady: true});
  }
}


class LocationPermissionScreen extends React.Component {
  render() {
    return (<Text>Can I have location permissions?</Text>);
  }
}

class InitialScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'screen',
    header: {
      visible: false,
      headerMode: 'screen'
    },
  };

  render() {
    let m = 15;
    return (
      <View style={styles.container}>
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
          <Image style={{
              height: 138 / 2.475,
              width: 198 / 2.475,
            }}
            source={require('./assets/logo_launchscreen@3x.png')}
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
          <View style={{
              backgroundColor: PINK,
              marginHorizontal: m,
              marginBottom: m,
              height: 50,
              borderRadius: 6,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
          }}>
            <Text style={{
                color: 'white',
                fontSize: 18,
            }}>Get started</Text>
          </View>
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
  navigationOptions: {
    headerMode: 'screen',
    header: {
      headerMode: 'screen',
      visible: false,
    },
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
