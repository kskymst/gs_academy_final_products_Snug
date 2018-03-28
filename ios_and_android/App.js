import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

import LoginSignupScreen from './src/screens/LoginSignupScreen';
import MypageScreen from './src/screens/MypageScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import MessageBoxScreen from './src/screens/MessageBoxScreen';
import MessageRoomScreen from './src/screens/MessageRoomScreen';
import TimeLineScreen from './src/screens/TimeLineScreen';
import ShopListScreen from './src/screens/ShopListScreen';
import CameraScreen from './src/screens/CameraScreen';
import SettingAccountScreen from './src/screens/SettingAccountScreen';
import TagSearchScreen from './src/screens/TagSearchScreen';

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
  TimeLine: { screen: TimeLineScreen },
  ItemDetail: { screen: ItemDetailScreen },
  MypageScreen: { screen: MypageScreen },
  TagSearch: { screen: TagSearchScreen },
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
  TagSearch: { screen: TagSearchScreen },
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
  TagSearch: { screen: TagSearchScreen },
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


const TabStack = TabNavigator({
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

const MainStack = StackNavigator({
  LoginSignup: { screen: LoginSignupScreen },
  MainContents: { screen: TabStack },
}, {
  headerMode: 'none',
});

// eslint-disable-next-line
export default class App extends React.Component {

  componentWillMount() {
    const region = {
      identifier: 'microbit-snug',
      uuid: 'E20A39F4-73F5-4BC4-0000-17D1AD07A961',
    };
    // Request for authorization while the app is open
    Beacons.requestWhenInUseAuthorization();
    Beacons.shouldDropEmptyRanges(true);

    Beacons.startMonitoringForRegion(region)
      .then(() => console.log('Beacons monitoring started succesfully'));

    Beacons.startRangingBeaconsInRegion(region)
      .then(() => console.log('Beacons ranging started succesfully'));

    Beacons.startUpdatingLocation();
  }

  componentWillUnmount() {
    const region = {
      identifier: 'microbit-snug',
      uuid: 'E20A39F4-73F5-4BC4-A12F-17D1AD07A961',
    };

    Beacons.stopMonitoringForRegion(region)
      .then(() => console.log('Beacons monitoring stopped succesfully'));

    Beacons.stopRangingBeaconsInRegion(region)
      .then(() => console.log('Beacons ranging stopped succesfully'))

    Beacons.stopUpdatingLocation();
  }


  render() {
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
      },
    );
    return (
      <MainStack />
    );
  }
}
