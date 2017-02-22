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

import delay from 'delay';
import ResponsiveImage from '@exponent/react-native-responsive-image';

var {height, width} = Dimensions.get('window');
console.log({height, width});

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
      Exponent.Asset.fromModule(require('./assets/Onboarding - Location - Background blurred@2x.png')).downloadAsync(),
      Exponent.Asset.fromModule(require('./assets/Onboarding - Location - Background blurred@3x.png')).downloadAsync(),
      Exponent.Asset.fromModule(require('./assets/Onboarding - Location - Arrow@2x.png')).downloadAsync(),
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

  state = {
    askForLocation: false,
  };

  async componentDidMount() {
    const { navigate } = this.props.navigation;
    // this.setState({askForLocation: true});
    let permsResult = await Exponent.Permissions.askAsync(Exponent.Permissions.LOCATION);
    if (permsResult !== 'granted') {
      console.log("granted");
    } else {
      console.log("not granted");
    }
    // await delay(500);
  }

  render() {
    const { navigate } = this.props.navigation;

    // if (this.state.askForLocation) {
    if (true) {
      return (
        <View style={{
            height,
            width,
            flexDirection: 'column',
          }}>
          <View style={{
              flex: 1,
            }}>
            <ResponsiveImage
              sources={{
                2: require('./assets/Onboarding - Location - Background blurred@2x.png'),
                3: require('./assets/Onboarding - Location - Background blurred@3x.png'),
              }}
              style={{
                position: 'absolute',
                height,
                width,
                top: 0,
                left: 0,
              }}
            />
          <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
          }}>
              <View style={{
                  height: 184, //(256 / 1024 * height), // / 2,
                  width: 272, //(376 / 576) * width, // 378 / 2,
                  backgroundColor: 'transparent',
              }}>
                <Image source={require('./assets/Onboarding - Location - Arrow@2x.png')} style={{
                    width: 84 / 2,
                    height: 144 / 2,
                    position: 'absolute',
                    top: 184,
                    marginTop: 15 + 30,
                    marginLeft: 272 / 4 - (84 / 2 / 2),
                    left: 272 / 2,
                }} />
              </View>
            </View>
          </View>
          <View style={{
              backgroundColor: 'transparent',
              marginBottom: 40 / 2.5,
              marginHorizontal: 40 / 2.5,
          }}>
            <Text style={{
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

class GoToSettingsScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{
          height,
          width,
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <View style={{
            marginTop: 22,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{
              fontSize: 22,
              color: 'black',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: 14,
              marginTop: 14,
            }}>Turn on Location</Text>
          <Text style={{
              color: '#333333',
              fontSize: 13,
              textAlign: 'center',
            }}>We can't pick you up if we don't know where you are! Go to Settings, select 'Privacy', then 'Location Services'</Text>
        </View>
        <View style={{
            flex: 1,
            width,
            justifyContent: 'flex-end',
            alignItems: 'center',
        }}>
          <Image
            source={require('./assets/Onboarding - Location - Settings@2x.png')}
            style={{
              width: 523 / 2,
              height: 854 / 2,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log("Touched that settings thing");
            // iOS only :/
            Linking.openURL("prefs:root=General");
          }}
          activeOpacity={0.8}
        >
          <View style={{
              backgroundColor: '#FF00BB',
              justifyContent: 'center',
              alignItems: 'center',
              height: 66,
              width,
          }}>
            <Text style={{
                color: 'white',
                fontSize: 24,
            }}>Go to 'Settings'</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

import {
  StackNavigator,
} from 'react-navigation';

const BasicApp = StackNavigator({
  GoToSettingsScreen: {screen: GoToSettingsScreen},
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
