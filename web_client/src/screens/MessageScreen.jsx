import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class MessageScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      messageRooms: [],
    };
  }

  componentWillReceiveProps(nextProps) {
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
          .get()
          .then((_querySnapshot) => {
            _querySnapshot.forEach((_doc) => {
              messageList.push(_doc.data());
            });
            const adjustList = {};
            const messageRoom = [];
            messageList.sort((a, b) => (
              a.createdOn > b.createdOn ? 1 : -1
            ));
            for (let i = 0; i < messageList.length; i++) {
              adjustList[messageList[i]['messageRoom']] = messageList[i];
            }
            // eslint-disable-next-line
            for (let key in adjustList) {
              messageRoom.push(adjustList[key]);
            }
            messageRoom.sort((a, b) => (
              a.createdOn < b.createdOn ? 1 : -1
            ));
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
                  this.setState({ messageRooms });
                });
            });
          });
      });
  }

  render() {
    let post = '';
    if (this.state.messageRooms.length !== 0) {
      post = this.state.messageRooms.map((data, index) => {
        let userId = data.postUserId;
        if (userId === this.props.myId) {
          userId = data.otherId;
        }
        const timestamp = data.createdOn.slice(5, -3).replace('_', '月').replace(' ', '日');
        return (
          <div
            key={data.createdOn + index}
            className="message-person"
            onClick={() => this.props.openMessageBox(userId)}
          >
            <img
              src={data.userImage}
              alt=""
            />
            <div className="message-person-center">
              <p>{data.userName}</p>
              <p>{data.text}</p>
            </div>
            <div className="datetime">
              <p>{timestamp}</p>
            </div>
          </div>
        );
      });
    }

    return (
      <div className="message-screen-wapper">
        { post }
      </div>
    );
  }
}

export default MessageScreen;
