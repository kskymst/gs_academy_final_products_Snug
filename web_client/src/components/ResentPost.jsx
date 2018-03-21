import React from 'react';

import LikeButton from '../subComponents/LikeButton';
import Comment from '../subComponents/Comment';

// eslint-disable-next-line
class ResentPost extends React.Component {
  render() {
    const posts = this.props.dataList.map(data => (
      <div className="resent-post-outer" key={data.id}>
        <div className="post-top-content" >
          <div className="post-user" >
            <img src={data.userImage} alt="bland-logo" />
            <h4>{data.userName}</h4>
          </div>
          <p>{ data.createdOn }</p>
        </div>
        <img
          className="post-main-image"
          src={data.imageUrl}
          alt="photos"
        />
        <LikeButton data={data} />
        <Comment data={data} />
        <div >
          <textarea />

        </div>
      </div>
    ));

    return (
      <div>
        { posts }
      </div>
    );
  }
}

export default ResentPost;
