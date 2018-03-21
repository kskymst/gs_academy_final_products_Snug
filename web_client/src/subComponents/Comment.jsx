import React from 'react';
import firebase from 'firebase';

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
        console.log(commentList);
        this.setState({ commentList });
      });
  }

  render() {
    let comments = this.state.commentList;
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
        <div className="posted-comment">
          <p>{this.props.data.userName}</p>
          <p>{this.props.data.text}</p>
        </div>
        { comments }
      </div>
    );
  }
}

export default Comment;
