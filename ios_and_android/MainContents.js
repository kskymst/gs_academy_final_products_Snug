import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MypageScreen from './src/screens/MypageScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import MessageBoxScreen from './src/screens/MessageBoxScreen';
import MessageRoomScreen from './src/screens/MessageRoomScreen';
import TimeLineScreen from './src/screens/TimeLineScreen';
import ShopListScreen from './src/screens/ShopListScreen';
import CameraScreen from './src/screens/CameraScreen';
import SettingAccountScreen from './src/screens/SettingAccountScreen';
import TagSearchScreen from './src/screens/TagSearchScreen';

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
export default class MainContents extends React.Component {

  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <Tab />
    );
  }
}
