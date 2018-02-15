import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation'

import MypageScreen from './src/screens/MypageScreen'

import ItemDetailScreen from './src/screens/ItemDetailScreen'


const MypageStack = StackNavigator ({
  ItemDetail: { screen: ItemDetailScreen },
  Home: { screen: MypageScreen },
});

const Tab = TabNavigator({
  Timeline: { screen: MypageStack },
  Message: { screen: MypageScreen },
  Camera: { screen: MypageScreen },
  Shop: { screen: MypageScreen },
  Mypage: { screen: MypageScreen },
},{
  tabBarOptions: {
    activeTintColor: '#037aff',
    inactiveTintColor: '#737373',
  }
})

class App extends React.Component {
  render() {
    return (
        <Tab />
    )
  }
}

export default App;
