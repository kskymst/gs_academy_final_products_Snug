import React from 'react';
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
  }

  componentWillMount() {
    const db = firebase.firestore();
    db.collection(`collections/${this.props.data.id}/comments`)
      .onSnapshot((querySnapshot) => {
        const commentList = [];
        querySnapshot.forEach((doc) => {
          commentList.push(doc.data());
        });
        this.setState({ commentList });
      });
  }

  render() {
    let comments = this.state.commentList;
    let myComment = '';
    if (!this.props.myComment) {
      myComment = (
        <div className="posted-comment">
          <p>{this.props.data.userName}</p>
          <p>{this.props.data.text}</p>
        </div>
      );
    }
    if (comments) {
      comments = this.state.commentList.map(comment => (
        <div className="posted-comment" key={comment.createdOn}>
          <p>{comment.userName}</p>
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
          <textarea rows="3" placeholder="コメントする" />
          <button>
            <SendIcon className="sendIcon" size="24" />
          </button>
        </div>

      </div>
    );
  }
}

export default Comment;
