import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import firebase from 'firebase';

import UserLibraryImages from '../components/UserLibraryImages';

class TimeLineScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
    };
  }

  componentWillMount() {
    const db = firebase.firestore();
    db.collection('collections').orderBy('createdOnNumber', 'desc')
      .onSnapshot((querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => {
          dataList.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ dataList });
      });
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <UserLibraryImages dataList={this.state.dataList} navigation={this.props.navigation}/>
      </ScrollView>
    );
  }
}

export default TimeLineScreen;
