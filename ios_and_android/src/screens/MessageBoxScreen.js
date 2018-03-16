import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import firebase from 'firebase';

import UserAccounts from '../components/UserAccounts';


class MessageBoxScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      test: '',
    };
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchArea}>
          <TextInput defaultValue={''} placeholder={'検索'} style={styles.searchInput} />
          <TouchableHighlight>
            <Icon name="border-color" size={25} color={'#44B26B'}/>
          </TouchableHighlight>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <UserAccounts navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 16,
  },
  searchInput: {
    backgroundColor: '#ddd',
    width: '85%',
    fontSize: 18,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 30,
  },
});

export default MessageBoxScreen;
