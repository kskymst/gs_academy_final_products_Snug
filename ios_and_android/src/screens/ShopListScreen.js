import React from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

import ShopList from '../components/ShopList';

class ShopListScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      shopDataList: [],
      loading: true,
    };
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const shopDataList = [];
    db.collection('users')
      .where('type', '==', 'shop')
      .where('gender', '==', 'both')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          shopDataList.push({ ...doc.data(), key: doc.id });
        });
        db.collection('users').doc(currentUser.uid)
          .get()
          .then((_querySnapshot) => {
            const userdata = _querySnapshot.data();
            db.collection('users')
              .where('type', '==', 'shop')
              .where('gender', '==', userdata.gender)
              .get()
              .then((__querySnapshot) => {
                __querySnapshot.forEach((_doc) => {
                  shopDataList.push({ ..._doc.data(), key: _doc.id });
                });
                const adjustList = [];
                const shopDataLists =[];
                for (let i = 0; i < shopDataList.length; i++) {
                  adjustList[shopDataList[i]['key']] = shopDataList[i];
                }
                // eslint-disable-next-line
                for (let key in adjustList) {
                  shopDataLists.push(adjustList[key]);
                }
                shopDataLists.sort((a, b) => (
                  a.datetime < b.datetime ? 1 : -1
                ));
                this.setState({
                  shopDataList: shopDataLists,
                  loading: false,
                });
              });
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ShopList navigation={this.props.navigation} shopDataList={this.state.shopDataList} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ShopListScreen;
