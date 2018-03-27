import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';
import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

import LoginSignupScreen from './src/screens/LoginSignupScreen';
import MainContents from './MainContents';

import ENV from './env.json';

require('firebase/firestore');

const config = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PRJ_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
};
firebase.initializeApp(config);

const MainStack = StackNavigator({
  LoginSignup: { screen: LoginSignupScreen },
  MainContents: { screen: MainContents },
});

// eslint-disable-next-line
export default class App extends React.Component {
  render() {
    // const region = {
    //   identifier: 'microbit-snug',
    //   uuid: 'E20A39F4-73F5-4BC4-A12F-17D1AD07A961',
    // };
    // // Request for authorization while the app is open
    // Beacons.requestAlwaysAuthorization();   
    // Beacons.startMonitoringForRegion(region);
    // Beacons.startRangingBeaconsInRegion(region);  
    // Beacons.startUpdatingLocation();
    // // Listen for beacon changes
    // const subscription = DeviceEventEmitter.addListener(
    //   'beaconsDidRange',
    //   (data) => {
    //     // data.region - The current region
    //     // data.region.identifier
    //     // data.region.uuid
    //     // console.log(data.beacons);
    //     // data.beacons - Array of all beacons inside a region
    //     //  in the following structure:
    //     //    .uuid
    //     //    .major - The major version of a beacon
    //     //    .minor - The minor version of a beacon
    //     //    .rssi - Signal strength: RSSI value (between -100 and 0)
    //     //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
    //     //    .accuracy - The accuracy of a beacon
    //   };
    // );
    return (
      <MainStack />
    );
  }
}
