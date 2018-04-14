import React from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

import UserLibraryImages from '../components/UserLibraryImages';

class TimeLineScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
      loading: true,
    };
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection('users').doc(currentUser.uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.data().gender === 'both') {
          db.collection('collections')
            .onSnapshot((_querySnapshot) => {
              if (this.state.dataList.length !== _querySnapshot.docs.length) {
                const dataList = [];
                _querySnapshot.forEach((doc) => {
                  dataList.push({ ...doc.data(), key: doc.id, loaded: false });
                });
                dataList.sort((a, b) => (
                  a.createdOnNumber < b.createdOnNumber ? 1 : -1
                ));
                this.setState({
                  dataList,
                  loading: false,
                });
              }
            });
          return;
        }
        db.collection('collections')
          .where('gender', '==', querySnapshot.data().gender)
          .onSnapshot((_querySnapshot) => {
            if (this.state.dataList.length !== _querySnapshot.docs.length) {
              const dataList = [];
              _querySnapshot.forEach((doc) => {
                dataList.push({ ...doc.data(), key: doc.id, loaded: false });
              });
              dataList.sort((a, b) => (
                a.createdOnNumber < b.createdOnNumber ? 1 : -1
              ));
              this.setState({
                dataList,
                loading: false,
              });
            }
          });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#777" />
        </View>
      );
    }
    return (
      <View>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <UserLibraryImages dataList={this.state.dataList} navigation={this.props.navigation}/>
      </View>
    );
  }
}

export default TimeLineScreen;
