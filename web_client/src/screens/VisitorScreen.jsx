import React from 'react';
import firebase from 'firebase';

import Visitor from '../components/Visitor';

// eslint-disable-next-line
class VisitorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitorList: [],
    };
  }

  // componentDidUpdate() {
  componentWillMount() {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection(`users/${user.uid}/visitor`)
          .orderBy('visitedOn', 'desc').limit(10)
          .get()
          .then((querySnapshot) => {
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
            this.setState({ visitorList });
          });
      } else {
        const { history } = this.props;
        history.push('/');
      }
    });
  }

  render() {
    return (
      <div className="coming-customer-wrapper" >
        <Visitor visitorList={this.state.visitorList} />
      </div>
    );
  }
}

export default VisitorScreen;
