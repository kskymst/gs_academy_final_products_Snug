import React from 'react';

class MessageContents extends React.Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps === this.props) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    let messageList = '';
    if (this.props.messages.length !== 0) {
      messageList = this.props.messages.map((message, index) => {
        const postedDate = message.createdOn.slice(5, -3).replace('_', '月').replace(' ', '日 ');
        if (message.postUserId === this.props.myId) {
          return (
            <div
              className="myMessage"
              key={message.createdOn + index}
            >
              <div className="myMessage-inner">
                <p>{message.text}</p>
                <div
                  className="user-image"
                  style={{ backgroundImage: `url(${this.props.myData.userImage})` }}
                />
              </div>
              <p>{postedDate}</p>
            </div>
          );
        }
        return (
          <div
            className="otherMessage"
            key={message.createdOn}
          >
            <div className="otherMessage-inner">
              <div
                className="user-image"
                style={{ backgroundImage: `url(${this.props.otherData.userImage})` }}
              />
              <p>{message.text}</p>
            </div>
            <p>{postedDate}</p>
          </div>
        );
      });
    }
    return (
      <div className="message-contents-wrapper">
        {messageList}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => { this.messagesEnd = el; }}
        />
      </div>
    );
  }
}


export default MessageContents;
