import React from 'react';
import LoginInputForm from '../elements/LoginInputForm';
import SignupInputForm from '../elements/SignupInputForm';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

// eslint-disable-next-line
export default class InputForm extends React.Component {
  render() {
    return (
      <ScrollableTabView
        style={{ marginTop: 10 }}
        renderTabBar={() => <DefaultTabBar />}
        tabBarInactiveTextColor="#fff"
        tabBarActiveTextColor="#8E46FF"
        tabBarUnderlineStyle={{ backgroundColor: '#8E46FF' }}
        tabBarPosition="bottom"
      >
        <LoginInputForm
          tabLabel="Login"
          navigation={this.props.navigation}
        />
        <SignupInputForm
          tabLabel="Signup"
          navigation={this.props.navigation}
        />
      </ScrollableTabView>
    );
  }
}
