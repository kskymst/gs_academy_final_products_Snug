import React from 'react';
import firebase from 'firebase';

import ViewScreen from './ViewScreen';
import VisitorScreen from './VisitorScreen';
import MessageScreen from './MessageScreen';
import Message from '../components/Message';

class MainScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      myId: '',
      myData: '',
      message: '',
    };
    this.openMessageBox = this.openMessageBox.bind(this);
    this.closeMessageBox = this.closeMessageBox.bind(this);
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        db.collection('users').doc(user.uid)
          .onSnapshot((querySnapshot) => {
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

  openMessageBox(otherId) {
    const message = (
      <div className="message">
        <Message
          otherId={otherId}
          myId={this.state.myId}
          myData={this.state.myData}
          closeMessageBox={this.closeMessageBox}
        />
      </div>
    );
    this.setState({ message });
  }

  closeMessageBox() {
    this.setState({ message: '' });
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-screen-wrapper">
          <VisitorScreen />
          <ViewScreen
            myId={this.state.myId}
            myData={this.state.myData}
            openMessageBox={this.openMessageBox}
          />
          <MessageScreen
            myId={this.state.myId}
            myData={this.state.myData}
            openMessageBox={this.openMessageBox}
          />
        </div>
        { this.state.message }
      </React.Fragment>
    );
  }
}

export default MainScreen;
