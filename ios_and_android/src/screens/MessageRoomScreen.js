import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TextInput, TouchableHighlight, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';

import Messages from '../components/Messages';

const { width } = Dimensions.get('window');

class MessageRoomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myId: '',
      otherId: '',
      myName: '',
      otherName: '',
      myImage: '',
      text: '',
      messages: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    static navigationOptions = ({ navigation }) => {
      return{
        headerTitle: `${navigation.state.params.userData.userName}`,
      }
    }

  componentWillMount() { // 下記userIdは自分ではない
    const { userId, userData } = this.props.navigation.state.params;
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection('users').doc(currentUser.uid)
      .get()
      .then((doc) => {
        this.setState({
          myId: currentUser.uid,
          otherId: userId,
          myName: doc.data().userName,
          otherName: userData.userName,
          myImage: doc.data().userImage,
        });
      });
    db.collection('messages')
      .where('postUserId', '==', currentUser.uid)
      .where('otherId', '==', userId)
      .onSnapshot((querySnapshot) => {
        const messages = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            messages.push(doc.data());
          });
        }
        db.collection('messages')
          .where('postUserId', '==', userId)
          .where('otherId', '==', currentUser.uid)
          .onSnapshot((_querySnapshot) => {
            if (!_querySnapshot.empty) {
              _querySnapshot.forEach((_doc) => {
                messages.push(_doc.data());
              });
            }
            messages.sort((a, b) => (
              a.createdOn > b.createdOn ? 1 : -1
            ));
            this.setState({
              messages,
            });
          });
      });
  }

  handleSubmit() {
    const time = new Date().toLocaleString();
    const timestamp = time.replace(/\//g, '_');
    const db = firebase.firestore();
    db.collection('messages').doc(timestamp)
      .set({
        postUserId: this.state.myId,
        postUserName: this.state.myName,
        otherName: this.state.otherName,
        otherId: this.state.otherId,
        text: this.state.text,
        createdOn: timestamp,
      })
      .then(() => {
        this.setState({ text: '' });
      });
  }

  render() {
    const { userData } = this.props.navigation.state.params;
    return (
      <View style={styles.docs}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={60}
        >
          <ScrollView style={styles.container} >
            <Messages
              messages={this.state.messages}
              userData={userData}
              myId={this.state.myId}
              myImage={this.state.myImage}
              otherId={this.state.otherId}
            />
          </ScrollView>
          <View style={styles.inputForm}>
            <View style={styles.commentInputArea}>
              <TextInput
                value={this.state.text}
                multiline
                placeholder="メッセージを入力"
                style={styles.commentInput}
                onChangeText={text => this.setState({ text })}
              />
              <TouchableHighlight
                style={styles.submitButton}
                underlayColor="transparent"
                onPress={this.handleSubmit}
              >
                <Icon name="send" size={20} color="#fff" />
              </TouchableHighlight>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    height: Dimensions.get('window').height - 180,
  },
  inputForm: {
    padding: 8,
  },
  commentInputArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 16,
    paddingRight: 8,
  },
  commentInput: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    width: width / 1.3,
  },
  submitButton: {
    padding: 8,
    backgroundColor: '#44B26B',
    borderRadius: 60,
  },
  submitButtonText: {
    color: '#fff',
  },
});


export default MessageRoomScreen;
