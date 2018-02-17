import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

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
  Timeline: { 
    screen: TimeLineStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="timeline" size={25} color={tintColor} />,
    }
   },
  Shop:{ 
  screen: ShopStack,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Icon name="store-mall-directory" size={25} color={tintColor} />,
  }
  },
  Camera:   { 
    screen: MypageScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="camera" size={25} color={tintColor} />,
    }
   },
  Message:  { 
    screen: MessageStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="message" size={25} color={tintColor} />,
    }
   },
  Mypage:   { screen: MypageStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="person-outline" size={25} color={tintColor} />,
    }
  },
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
