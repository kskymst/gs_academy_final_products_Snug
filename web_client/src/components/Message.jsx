import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import CloseIcon from 'react-icons/lib/md/close';
import SendIcon from 'react-icons/lib/md/send';

import MessageContents from '../subComponents/MessageContents';

class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      messages: [],
      otherData: [],
      reduction: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getUserData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getUserData(nextProps);
  }

  getUserData(props) {
    const { myId, otherId } = props;
    const db = firebase.firestore();
    db.collection('users/').doc(otherId)
      .get()
      .then((__querySnapShot) => {
        db.collection('messages')
          .where('postUserId', '==', myId)
          .where('otherId', '==', otherId)
          .onSnapshot((querySnapshot) => {
            const messages = [];
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                messages.push(doc.data());
              });
            }
            db.collection('messages')
              .where('postUserId', '==', otherId)
              .where('otherId', '==', myId)
              .onSnapshot((_querySnapshot) => {
                const _messages = [];
                if (!_querySnapshot.empty) {
                  _querySnapshot.forEach((_doc) => {
                    _messages.push(_doc.data());
                  });
                }
                _messages.push(...messages);
                _messages.sort((a, b) => (
                  a.createdOnNumber > b.createdOnNumber ? 1 : -1
                ));
                this.setState({
                  reduction: false,
                  messages: _messages,
                  otherData: __querySnapShot.data(),
                });
              });
          });
      });
  }

  handleSubmit() {
    const time = new Date();
    const strTimestamp = String(time.getTime());
    const timestamp = time.toLocaleString().replace(/\//g, '_');
    const preUserList = [this.props.myId, this.props.otherId];
    const userList = preUserList.sort();
    const messageRoom = `${userList[0]}_${userList[1]}`;
    const db = firebase.firestore();
    db.collection('messages').doc(timestamp)
      .set({
        postUserId: this.props.myId,
        otherId: this.props.otherId,
        text: this.state.text,
        messageRoom,
        createdOn: timestamp,
        createdOnNumber: strTimestamp,
      })
      .then(() => {
        this.setState({ text: '' });
      });
  }

  render() {
    return (
      <div className="message-wrapper">
        <div className="message-header">
          <Link to={this.props.otherId} >
            <p>{ this.state.otherData.userName }</p>
          </Link>
          <div>
            <p
              className="reduction"
              onClick={() => this.setState({ reduction: !this.state.reduction })}
            >
            ＿
            </p>
            <CloseIcon
              size={26}
              className="close-icon"
              onClick={this.props.closeMessageBox}
            />
          </div>
        </div>
        <div style={this.state.reduction ? { display: 'none' } : null}>
          <MessageContents
            myId={this.props.myId}
            myData={this.props.myData}
            otherData={this.state.otherData}
            messages={this.state.messages}
            reduction={this.state.reduction}
          />
          <div style={{ height: 48 }} />
          <div className="input-area" >
            <textarea
              rows="1"
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
            />
            <SendIcon
              size={32}
              className="send-icon"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
