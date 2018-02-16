import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation'

import MypageScreen from './src/screens/MypageScreen'
import ItemDetailScreen from './src/screens/ItemDetailScreen'
import MessageBoxScreen from './src/screens/MessageBoxScreen'
import MessageScreen from './src/screens/MessageScreen'
import TimeLineScreen from './src/screens/TimeLineScreen'
import ShopListScreen from './src/screens/ShopListScreen'

const MypageStack = StackNavigator ({
  Mypage: { screen: MypageScreen },
  ItemDetail: { screen: ItemDetailScreen },
});

const MessageStack = StackNavigator ({
  MessageBox: { screen: MessageBoxScreen },
  Message: { screen: MessageScreen },
});

const TimeLineStack = StackNavigator ({
  TimeLine: { screen: TimeLineScreen },
  ItemDetail: { screen: ItemDetailScreen },
}, {
  navigationOptions: {
    headerTitle:'Snug',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#7457A3',
      height: 50,
    },
  },
});

const ShopStack = StackNavigator ({
  ShopList: { screen: ShopListScreen },
}, {
  navigationOptions: {
    headerTitle:'Shop',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#7457A3',
      height: 50,
    },
  },
});

const Tab = TabNavigator({
  Shop:     { screen: ShopStack },
  Timeline: { screen: TimeLineStack },
  Message:  { screen: MessageStack },
  Camera:   { screen: MypageScreen },
  Mypage:   { screen: MypageStack },
},{
  tabBarOptions: {
    activeTintColor: '#7457A3',
    inactiveTintColor: '#737373',
  }
})

export default class App extends React.Component {
  render() {
    return (
        <Tab />
    )
  }
}
