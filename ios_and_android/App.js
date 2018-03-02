import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';

import MypageScreen from './src/screens/MypageScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import MessageBoxScreen from './src/screens/MessageBoxScreen';
import MessageScreen from './src/screens/MessageScreen';
import TimeLineScreen from './src/screens/TimeLineScreen';
import ShopListScreen from './src/screens/ShopListScreen';
import LoginSignupScreen from './src/screens/LoginSignupScreen';
// import CameraScreen from './src/screens/CameraScreen';

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
  // Camera: { screen: CameraScreen },
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

// const CameraStack = StackNavigator({
//   Camera: { screen: CameraScreen },
// });

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
  Message: { screen: MessageScreen },
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
  Camera: {
    screen: TimeLineStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="camera" size={25} color={tintColor} />,
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
    return (
      <Tab />
    );
  }
}
