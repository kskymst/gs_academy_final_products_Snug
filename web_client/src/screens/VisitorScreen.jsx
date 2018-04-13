import React from 'react';
import firebase from 'firebase';
import VisitorIcon from 'react-icons/lib/md/speaker-phone';

import Visitor from '../components/Visitor';

// eslint-disable-next-line
class VisitorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitorLists: [],
    };
  }

  componentWillMount() {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection(`users/${user.uid}/visitor`)
          .orderBy('visitedOn', 'desc').limit(20)
          .onSnapshot((querySnapshot) => {
            const allVisitorList = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              data.key = doc.id;
              allVisitorList.push(data);
            });
            const adjustList = [];
            const visitorList = [];
            allVisitorList.sort((a, b) => (
              a.visitedOn > b.visitedOn ? 1 : -1
            ));
            for (let i = 0; i < allVisitorList.length; i++) {
              adjustList[allVisitorList[i]['userId']] = allVisitorList[i];
            }
            // eslint-disable-next-line
            for (let key in adjustList) {
              visitorList.push(adjustList[key]);
            }
            visitorList.sort((a, b) => (
              a.visitedOn < b.visitedOn ? 1 : -1
            ));
            const visitorLists = [];
            visitorList.forEach((data) => {
              db.collection('users/').doc(data.userId)
                .get()
                .then((_querySnapshot) => {
                  visitorLists.push(Object.assign(data, _querySnapshot.data()));
                  this.setState({ visitorLists });
                });
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
      <div className="visitor-wrapper" >
        <div className="visitor-inner" >
          <div className="visitor-title">
            <VisitorIcon
              className="icon"
            />
            <p>来店ユーザー</p>
          </div>
          <Visitor visitorList={this.state.visitorLists} />
        </div>
      </div>
    );
  }
}

export default VisitorScreen;
