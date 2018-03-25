import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';
import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

import MypageScreen from './src/screens/MypageScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import MessageBoxScreen from './src/screens/MessageBoxScreen';
import MessageRoomScreen from './src/screens/MessageRoomScreen';
import TimeLineScreen from './src/screens/TimeLineScreen';
import ShopListScreen from './src/screens/ShopListScreen';
import LoginSignupScreen from './src/screens/LoginSignupScreen';
import CameraScreen from './src/screens/CameraScreen';
import SettingAccountScreen from './src/screens/SettingAccountScreen';


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

const TimeLineStack = StackNavigator({
  // BleScreen: { screen: BleScreen },
  LoginSignup: { screen: LoginSignupScreen },
  TimeLine: { screen: TimeLineScreen },
  ItemDetail: { screen: ItemDetailScreen },
  MypageScreen: { screen: MypageScreen },
}, {
  navigationOptions: {
    headerTitle: 'Timeline',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#7457A3',
      height: 40,
    },
    headerTitleStyle: {
      fontSize: 15,
    },
    headerBackTitleStyle: {
      fontSize: 15,
    },
  },
});

const CameraStack = StackNavigator({
  Camera: { screen: CameraScreen },
}, {
  navigationOptions: {
    headerTitle: 'Add',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#7457A3',
      height: 40,
    },
    headerTitleStyle: {
      fontSize: 15,
    },
    headerBackTitleStyle: {
      fontSize: 15,
    },
  },
});

const ShopStack = StackNavigator({
  ShopList: { screen: ShopListScreen },
  MypageScreen: { screen: MypageScreen },
  ItemDetail: { screen: ItemDetailScreen },
}, {
  navigationOptions: {
    headerTitle: 'Shop',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#7457A3',
      height: 40,
    },
    headerTitleStyle: {
      fontSize: 15,
    },
    headerBackTitleStyle: {
      fontSize: 15,
    },
  },
});

const MessageStack = StackNavigator({
  MessageBox: { screen: MessageBoxScreen },
  MessageRoom: { screen: MessageRoomScreen },
  MypageScreen: { screen: MypageScreen },
  ItemDetail: { screen: ItemDetailScreen },
}, {
  navigationOptions: {
    headerTitle: 'Message',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#7457A3',
      height: 40,
    },
    headerTitleStyle: {
      fontSize: 15,
    },
    headerBackTitleStyle: {
      fontSize: 15,
    },
  },
});

const MypageStack = StackNavigator({
  MypageScreen: { screen: MypageScreen },
  ItemDetail: { screen: ItemDetailScreen },
  SettingAccount: { screen: SettingAccountScreen },
}, {
  navigationOptions: {
    headerTitle: 'Mypage',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#7457A3',
      height: 40,
    },
    headerTitleStyle: {
      fontSize: 15,
    },
    headerBackTitleStyle: {
      fontSize: 15,
    },
  },
});


const Tab = TabNavigator({
  Timeline: {
    screen: TimeLineStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="timeline" size={25} color={tintColor} />,
    },
  },
  Shop: {
    screen: ShopStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="store-mall-directory" size={25} color={tintColor} />,
    },
  },
  Add: {
    screen: CameraStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="add-circle-outline" size={25} color={tintColor} />,
    },
  },
  Message: {
    screen: MessageStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="message" size={25} color={tintColor} />,
    },
  },
  Mypage: {
    screen: MypageStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="person-outline" size={25} color={tintColor} />,
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: '#7457A3',
    inactiveTintColor: '#737373',
  },
});

// eslint-disable-next-line
export default class App extends React.Component {
  render() {
    const region = {
      identifier: 'NefryBT-snug',
      // uuid: '97F5B537-E9F3-B229-5F3F-03CD0F0E7326',
      // uuid: '4FAFC201-1FB5-459E-8fCC-C5C9C331914B',
      uuid: '00000000-1AE9-1001-B000-001C4D6465E3',
  };
  
  // Request for authorization while the app is open
  Beacons.requestWhenInUseAuthorization();
  
  Beacons.startMonitoringForRegion(region);
  Beacons.startRangingBeaconsInRegion(region);
  
  Beacons.startUpdatingLocation();
  
  // Listen for beacon changes
  const subscription = DeviceEventEmitter.addListener(
    'beaconsDidRange',
    (data) => {
      // data.region - The current region
      // data.region.identifier
      // data.region.uuid
      console.log(data.beacons);
      // data.beacons - Array of all beacons inside a region
      //  in the following structure:
      //    .uuid
      //    .major - The major version of a beacon
      //    .minor - The minor version of a beacon
      //    .rssi - Signal strength: RSSI value (between -100 and 0)
      //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
      //    .accuracy - The accuracy of a beacon
    }
  );
    return (
      <Tab />
    );
  }
}
