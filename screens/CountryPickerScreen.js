import React from 'react';
import {
  Button,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import AlphabetListView from 'react-native-alphabetlistview';

const UnitedStates =  [require('../assets/flags/Country - Flag - us@3x.png'), 'United States', '+1', '(201) 555-0123'];

let countryData = {
  'common': [
    [require('../assets/flags/Country - Flag - au@3x.png'), 'Australia', '+61', '212345678'],
    [require('../assets/flags/Country - Flag - ca@3x.png'), 'Canada', '+1', '(204) 234-5678'],
    [require('../assets/flags/Country - Flag - cn@3x.png'), 'China', '+86', '10 1234 5678'],
    [require('../assets/flags/Country - Flag - fr@3x.png'), 'France', '+33', '123456789'],
    [require('../assets/flags/Country - Flag - in@3x.png'), 'India', '+91', '11 2345 6789'],
    [require('../assets/flags/Country - Flag - jp@3x.png'), 'Japan', '+81', '312345678'],
    [require('../assets/flags/Country - Flag - mx@3x.png'), 'Mexico', '+52', '222 123 4567'],
    [require('../assets/flags/Country - Flag - pr@3x.png'), 'Puerto Rico', '+1', '(787) 234-5678'],
    [require('../assets/flags/Country - Flag - gb@3x.png'), 'United Kingdom', '+44', '1212345678'],
    [require('../assets/flags/Country - Flag - us@3x.png'), 'United States', '+1', '(201) 555-0123'],
  ],
  A: [UnitedStates],
  B: [UnitedStates],
  C: [UnitedStates],
  D: [UnitedStates],
  E: [UnitedStates],
  F: [UnitedStates],
  G: [UnitedStates],
  H: [UnitedStates],
  I: [UnitedStates],
  J: [UnitedStates],
  K: [UnitedStates],
  L: [UnitedStates],
  M: [UnitedStates],
  N: [UnitedStates],
  O: [UnitedStates],
  P: [UnitedStates],
  Q: [UnitedStates],
  R: [UnitedStates],
  S: [UnitedStates],
  T: [UnitedStates],
  U: [UnitedStates],
  V: [UnitedStates],
  W: [UnitedStates],
  X: [UnitedStates],
  Y: [UnitedStates],
  Z: [UnitedStates],
};


class SectionHeader extends React.Component {
  render() {
    let title = this.props.title;
    if (title === 'common') {
      title = "Common countries";
    }
    return (
      <View style={{
          flex: 1,
          height: 31,
          backgroundColor: '#f2eef7',
          alignItems: 'flex-end',
          flexDirection: 'row',
      }}>
        <View style={{
            backgroundColor: '#eeeeee',
            height: 1,
        }} />
        <Text style={{
            marginLeft: 17,
            color: 'black',
            fontSize: 14,
            marginBottom: 6,
        }}>{title}</Text>
        <View stlye={{
            backgroundColor: '#eeeeee',
            height: 2,
        }} />
      </View>
    );
  }
}
class SectionItem extends React.Component {

  render() {
    let title = this.props.title;
    if (title === 'common') {
      return (<View />);
    } else {
      return (
        <Text style={{
            color: '#555555',
            fontSize: 11,
        }}>{title}</Text>
      );
    }
  }

}


class Cell extends React.Component {

  render() {

    let [flag, name, countryCode, exampleNumber] = this.props.item;
    let flagSize = 16;
    return (
      <TouchableHighlight
        style={{height: 30, flex: 1}}
        underlayColor="#cccccc"
        activeOpacity={0.8}
        onPress={() => {
          console.log("Tapped " + name + " code=" + countryCode);
          // TODO: Dispatch a redux action
          this.props.goBack(null);
      }}>
        <View style={{height: 30, flex: 1, backgroundColor: 'white',}}>
          <View style={{
              flexDirection: 'row',
              paddingVertical: 6,
          }}>
            <Image source={flag} style={{
                height: flagSize,
                width: flagSize,
                marginHorizontal: 12,}} />
            <Text>{name}</Text>

          </View>
          <View style={{
                flex: 1,
                height: 1,
                backgroundColor: '#dddddd',
            }} />
        </View>
      </TouchableHighlight>
    );
  }
}



export default class CountryModalScreen extends React.Component {
  static navigationOptions = {
    title: 'Select Country',
    header: (navigation) => { return {
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
    }},
  };

  render() {

    const {goBack} = this.props.navigation;

    return (
      <AlphabetListView
        stickyHeaderIndices={[0]}
        data={countryData}
        cell={Cell}
        cellHeight={30}
        sectionListItem={SectionItem}
        sectionHeader={SectionHeader}
        sectionHeaderHeight={31}
        cellProps={{goBack,}}
        onCellSelect={() => {
          console.log("selected");
        }}
      />
    );
  }
}
