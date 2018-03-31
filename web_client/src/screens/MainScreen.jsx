import React from 'react';

import ViewScreen from './ViewScreen';
import VisitorScreen from './VisitorScreen';
import MessageScreen from './MessageScreen';

// eslint-disable-next-line
class MainScreen extends React.Component {
  render() {
    return (
      <div className="main-screen-wrapper" >
        <VisitorScreen />
        <ViewScreen />
        <MessageScreen />
      </div>
    );
  }
}

export default MainScreen;
