import React from 'react';
import {
  Button,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export default class CountryModalScreen extends React.Component {
  static navigationOptions = {
    title: 'Select Country',
    header: navigation => {
      return {
        cardStack: {
          gesturesEnabled: false,
        },
        titleStyle: {
          fontWeight: '400',
        },
        right: (
          <Button
            title="Close"
            color="#333333"
            onPress={() => {
              console.log('Pressed');
              navigation.goBack(null);
            }}
          />
        ),
      };
    },
  };

  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 15, padding: 10, backgroundColor: '#fff' }}>
          <Text>This is where the country picker would go</Text>
        </View>
      </View>
    );
  }
}
