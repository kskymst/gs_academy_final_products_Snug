import React from 'react';
import firebase from 'firebase';

import ViewScreen from './ViewScreen';
import VisitorScreen from './VisitorScreen';
import MessageScreen from './MessageScreen';


// eslint-disable-next-line
class MainScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      myId: '',
      myData: '',
    };
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        db.collection('users').doc(user.uid)
          .get()
          .then((querySnapshot) => {
            this.setState({
              myId: user.uid,
              myData: querySnapshot.data(),
            });
          });
      } else {
        const { history } = this.props;
        history.push('/');
      }
    });
  }
  render() {
    return (
      <div className="main-screen-wrapper" >
        <VisitorScreen />
        <ViewScreen myId={this.state.myId} myData={this.state.myData} />
        <MessageScreen />
      </div>
    );
  }
}

export default MainScreen;
