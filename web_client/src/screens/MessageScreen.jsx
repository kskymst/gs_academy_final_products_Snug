import React from 'react';

// eslint-disable-next-line
class MessageScreen extends React.Component {
  render() {
    return (
      <div className="message-screen-wapper">
        <button
          onClick={() => this.props.openMessageBox('sucsess!')}
        >
          test
        </button>
      </div>
    );
  }
}

export default MessageScreen;
