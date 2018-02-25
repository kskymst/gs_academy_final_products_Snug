import React from 'react';

import Header from './screens/Header';
import TopPageScreen from './screens/TopPageScreen';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <TopPageScreen />
      </React.Fragment>
    );
  }
}

export default App;

