import React from 'react';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import firebase from 'firebase';

import Header from './screens/Header';
import TopPageScreen from './screens/TopPageScreen';
import MainScreen from './screens/MainScreen';
import NoMatch from './screens/NoMatch';

import ENV from '../env';

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


// eslint-disable-next-line
class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory} >
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={TopPageScreen} />
            <Route exact path="/signup" component={TopPageScreen} />
            <Route exact path="/main" component={MainScreen} />
            <Route component={NoMatch} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

