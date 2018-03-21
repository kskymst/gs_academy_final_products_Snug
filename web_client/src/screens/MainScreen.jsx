import React from 'react';
import firebase from 'firebase';

import ViewScreen from './ViewScreen';
import ComingCustomerScreen from './ComingCustomerScreen';
import MessageScreen from './MessageScreen';
import SlideSidebar from '../components/SlideSidebar';

// eslint-disable-next-line
class MainScreen extends React.Component {
  componentWillMount() {
    // const { currentUser } = firebase.auth();
    // if (!currentUser.uid) {
    //   const { history } = this.props;
    //   history.push('/');
    // }
  }

  render() {
    return (
      <div className="main-screen-wrapper" >
        <ComingCustomerScreen />
        <ViewScreen />
        <MessageScreen />
      </div>
    );
  }
}

export default MainScreen;
