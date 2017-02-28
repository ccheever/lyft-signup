import { Platform, Keyboard } from 'react-native';

let currentHeight = 0;

if (Platform.OS === 'ios') {
  this.subscriptions = [
    Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange),
  ];
} else {
  this.subscriptions = [
    Keyboard.addListener('keyboardDidHide', onKeyboardChange),
    Keyboard.addListener('keyboardDidShow', onKeyboardChange),
  ];
}

function onKeyboardChange(event) {
  if (!event) {
    currentHeight = 0;
  } else {
    currentHeight = event.endCoordinates.height;
  }
}

export default function getCurrentKeyboardHeight() {
  return currentHeight;
}
