import React from 'react';
import { View, StatusBar } from 'react-native';
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
          dataList.push({ ...doc.data(), key: doc.id, loaded: false });
        });
        this.setState({ dataList });
      });
  }

  render() {
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
