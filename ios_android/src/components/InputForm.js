import React from 'react';
import LoginInputForm from '../elements/LoginInputForm'
import SignupInputForm from '../elements/SignupInputForm'

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

export default () => {
  return <ScrollableTabView
    style={{marginTop: 10,}}
    renderTabBar={() => <DefaultTabBar />}
    tabBarInactiveTextColor='#fff'
    tabBarActiveTextColor='#8E46FF'
    tabBarUnderlineStyle={{backgroundColor: '#8E46FF'}}
    tabBarPosition='bottom'
    >
    <LoginInputForm
      tabLabel='Login'  
    />
    <SignupInputForm
      tabLabel='Signup'
    />
  </ScrollableTabView>
}
