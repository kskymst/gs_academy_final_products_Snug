import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';

const Dimensions = require('Dimensions');

const { width } = Dimensions.get('window');


class ItemComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      userName: '',
      text: '',
      commentList: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection('users').doc(currentUser.uid)
      .get()
      .then((querySnapshot) => {
        const currentUserData = querySnapshot.data();
        this.setState({
          uid: currentUser.uid,
          userName: currentUserData.userName,
        });
      });
    db.collection(`collections/${this.props.data.key}/comments`)
      .onSnapshot((querySnapshot) => {
        const commentList = [];
        querySnapshot.forEach((doc) => {
          commentList.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ commentList });
      });
  }

  handleSubmit() {
    const db = firebase.firestore();
    const time = new Date().toLocaleString();
    const timestamp = time.replace(/\//g, '_');
    db.collection(`collections/${this.props.data.key}/comments`).doc(timestamp)
      .set({
        userId: this.state.uid,
        userName: this.state.userName,
        comment: this.state.text,
      })
      .then(() => {
        this.setState({ text: '' });
      });
  }

  render() {
    const comments = this.state.commentList.map((data) => {
      return (
        <View style={styles.commentContent} key={data.key} >
          <Text
            style={styles.commentUserName}
            onPress={() => this.props.navigation.navigate('MypageScreen', { user: data.userId })}
          >
            {data.userName} 
          </Text>
          <Text>{data.comment}</Text>
        </View>
      );
    });
    return (
      <View style={styles.commentArea}>
        <View style={styles.commentAreaInner}>
          <View style={styles.commentIndent}>
            <Icon name="chat-bubble-outline" size={22} color={'#000'}/>
            <Text> Comment</Text>
          </View>
          <View style={styles.commentContent}>
            <Text
              style={styles.commentUserName}
              onPress={() => this.props.navigation.navigate('MypageScreen', { user: this.props.data.user })}
            >
              {this.props.data.userName}
            </Text>
            <Text>{this.props.data.text}</Text>
          </View>
          { comments }
        </View>
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
    );
  }
}

const styles = StyleSheet.create({
  commentArea: {
    width: '100%',
    backgroundColor: '#fff',
  },
  commentAreaInner: {
    padding: 16,
  },
  commentIndent: {
    flexDirection: 'row',
  },
  commentUserName: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginRight: 10,
  },
  commentContent: {
    flexDirection: 'row',
    marginTop: 12,
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

export default ItemComment;
