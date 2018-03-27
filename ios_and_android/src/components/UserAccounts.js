import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';
import firebase from 'firebase';

const { width } = Dimensions.get('window');


// eslint-disable-next-line
class UserAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(userId) {
    const db = firebase.firestore();
    db.collection('users').doc(userId)
      .get()
      .then((querySnapshot) => {
        this.props.navigation.navigate('MessageRoom', { userData: querySnapshot.data(), userId });
      });
  }

  render() {
    const { currentUser } = firebase.auth();
    const roomData = this.props.data.map((data) => {
      const userImage = (
        data.postUserId === currentUser.uid ?
          data.otherImage :
          data.postUserImage
      );
      const userName = (
        data.postUserId === currentUser.uid ?
          data.otherName :
          data.postUserName
      );
      const userId = (
        data.postUserId === currentUser.uid ?
          data.otherId :
          data.postUserId
      );
      const timestamp = data.createdOn.slice(5, -3).replace('_', '月').replace(' ', '日');
      return (
        <TouchableHighlight
          key={data.messageRoom}
          onPress={() => this.handleSubmit(userId)}
          underlayColor="transparent"
        >
          <View style={styles.userArea}>
            <Image
              source={{ uri: userImage }}
              style={styles.userImage}
            />
            <View style={styles.userContents}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userMessage}>{data.text}</Text>
            </View>
            <Text style={styles.messageDate}>{timestamp}</Text>
          </View>
        </TouchableHighlight>
      );
    });
    return (
      <View style={styles.container}>
        { roomData }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: width / 1.05,
    height: 80,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
  },
  userContents: {
    width: width / 2,
    overflow: 'hidden',
    marginLeft: 8,
    marginRight: 8,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userMessage: {
    color: '#777',
    fontSize: 12,
  },
  messageDate: {
    fontSize: 12,
  },
});

export default UserAccounts;
