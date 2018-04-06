import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import SendIcon from 'react-icons/lib/md/send';

import CommentIcon from 'react-icons/lib/md/message';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      commentList: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const db = firebase.firestore();
    db.collection(`collections/${nextProps.data.id}/comments`)
      .onSnapshot((querySnapshot) => {
        const commentList = [];
        querySnapshot.forEach((doc) => {
          commentList.push(doc.data());
        });
        this.setState({ commentList });
      });
  }


  handleSubmit(itemId) {
    if (this.state.text !== '') {
      const db = firebase.firestore();
      const time = new Date().toLocaleString();
      const timestamp = time.replace(/\//g, '_');
      db.collection(`collections/${itemId}/comments`).doc(timestamp)
        .set({
          userId: this.props.myId,
          userName: this.props.myData.userName,
          comment: this.state.text,
          createdOn: timestamp,
        })
        .then(() => {
          this.setState({ text: '' });
        });
    }
  }

  render() {
    let comments = this.state.commentList;
    let myComment = '';
    if (!this.props.myComment) {
      myComment = (
        <div className="posted-comment">
          <Link to={`/main/${this.props.data.user}`}>
            <p>{this.props.data.userName}</p>
          </Link>
          <p>{this.props.data.text}</p>
        </div>
      );
    }
    if (comments) {
      comments = this.state.commentList.map(comment => (
        <div className="posted-comment" key={comment.createdOn}>
          <Link to={`/main/${comment.userId}`}>
            <p>{comment.userName}</p>
          </Link>
          <p>{comment.comment}</p>
        </div>
      ));
    }
    return (
      <div className="comment-wrapper" >
        <div className="comment-area-title" >
          <CommentIcon
            size="28px"
          />
          <span>Comments</span>
        </div>
        { myComment }
        { comments }
        <div className="comment-input" >
          <textarea
            rows="3"
            placeholder="コメントする"
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <button onClick={() => this.handleSubmit(this.props.data.id)}>
            <SendIcon className="sendIcon" size="24" />
          </button>
        </div>
      </div>
    );
  }
}

export default Comment;
