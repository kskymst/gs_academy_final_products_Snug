import React from 'react';
import firebase from 'firebase';

import MessageIcon from 'react-icons/lib/fa/comments-o';

class MessageScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      myId: '',
      messageRooms: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myId !== this.state.myId) {
      this.setState({ myId: nextProps.myId });
      const db = firebase.firestore();
      let messageList = [];
      db.collection('messages')
        .where('postUserId', '==', nextProps.myId)
        .onSnapshot((querySnapshot) => {
          messageList = [];
          querySnapshot.forEach((doc) => {
            messageList.push(doc.data());
          });
          db.collection('messages')
            .where('otherId', '==', nextProps.myId)
            .onSnapshot((_querySnapshot) => {
              _querySnapshot.forEach((_doc) => {
                messageList.push(_doc.data());
              });
              const adjustList = {};
              const messageRoom = [];
              messageList.sort((a, b) => (
                a.createdOnNumber > b.createdOnNumber ? 1 : -1
              ));
              for (let i = 0; i < messageList.length; i++) {
                adjustList[messageList[i]['messageRoom']] = messageList[i];
              }
              // eslint-disable-next-line
              for (let key in adjustList) {
                messageRoom.push(adjustList[key]);
              }
              const messageRooms = [];
              messageRoom.forEach((data) => {
                let userId = data.postUserId;
                if (userId === nextProps.myId) {
                  userId = data.otherId;
                }
                db.collection('users/').doc(userId)
                  .get()
                  .then((__querySnapshot) => {
                    messageRooms.push(Object.assign(data, __querySnapshot.data()));
                    messageRooms.sort((a, b) => (
                      a.createdOnNumber < b.createdOnNumber ? 1 : -1
                    ));
                    this.setState({ messageRooms });// 問題はここ！！！！
                  });
              });
            });
        });
    }
  }

  render() {
    let post = '';
    if (this.state.messageRooms.length !== 0) {
      const messageRoom = this.state.messageRooms;
      post = messageRoom.map((data) => {
        let userId = data.postUserId;
        if (userId === this.props.myId) {
          userId = data.otherId;
        }
        const timestamp = data.createdOn.slice(5, -3).replace('_', '月').replace(' ', '日');
        return (
          <div
            key={data.createdOn}
            className="message-person"
            onClick={() => this.props.openMessageBox(userId)}
          >
            <div className="user-image-area">
              <div
                style={{ backgroundImage: `url(${data.userImage})` }}
                className="user-image"
              />
            </div>
            <div className="message-person-center">
              <p>{data.userName}</p>
              <p>{data.text}</p>
              <p>{timestamp}</p>
            </div>
          </div>
        );
      });
    }

    return (
      <div className="message-screen-wapper">
        <div className="message-title">
          <MessageIcon size={40} />
          <p>メッセージ</p>
        </div>
        { post }
      </div>
    );
  }
}

export default MessageScreen;
