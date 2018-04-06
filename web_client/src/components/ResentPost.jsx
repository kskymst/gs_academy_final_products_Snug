import React from 'react';
import { Link } from 'react-router-dom';
import Tag from 'react-icons/lib/fa/tag';

import LikeButton from '../subComponents/LikeButton';
import Comment from '../subComponents/Comment';


const ResentPost = (props) => {
  const { myId, myData } = props;
  const posts = props.dataList.map((data) => {
    const timestamp = data.createdOn.slice(0, -3);
    const tags = Object.keys(data.tags).map((tag, index) => (
      <Link
        to={`/main/tag/${tag}`}
        key={tag + index}
        className="tag-link"
      >
        <Tag style={{ marginRight: 4, marginBottom: 2 }} />
        { tag }
      </Link>
    ));
    return (
      <div className="resent-post-outer" key={data.id}>
        <div className="post-top-content" >
          <Link to={`/main/${data.user}`} className="post-user" >
            <img src={data.userImage} alt="user_image" />
            <h4>{data.userName}</h4>
          </Link>
          <p>{ timestamp }</p>
        </div>
        <div className="divider" />
        <div className="post-main-image">
          <img
            src={data.imageUrl}
            alt="photos"
          />
        </div>
        <div className="post-tag">
          { tags }
        </div>
        <div className="resent-post-component-outer" >
          <LikeButton data={data} resentPost />
          <Comment
            data={data}
            myId={myId}
            myData={myData}
          />
        </div>
      </div>
    );
  });
  return (
    <div>
      { posts }
    </div>
  );
};

export default ResentPost;
