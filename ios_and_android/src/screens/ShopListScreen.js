import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import firebase from 'firebase';

import ShopList from '../components/ShopList';

// eslint-disable-next-line
class ShopListScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      shopDataList: [],
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
                shopDataList.sort((a, b) => (
                  a.datetime < b.datetime ? 1 : -1
                ));
                this.setState({ shopDataList });
              });
          });
      });
  }

  render() {
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
