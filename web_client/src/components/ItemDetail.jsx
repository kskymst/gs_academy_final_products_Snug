import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

import Tag from 'react-icons/lib/fa/tag';
import CloseIcon from 'react-icons/lib/md/close';

import LikeButton from '../subComponents/LikeButton';
import Comment from '../subComponents/Comment';

class ItemDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      itemData: [],
    };
  }


  componentWillMount() {
    const db = firebase.firestore();
    db.collection('collections').doc(this.props.match.params.query)
      .get()
      .then((querySnapshot) => {
        this.setState({ itemData: querySnapshot.data() });
      });
  }

  render() {
    const { params, url} = this.props.match;
    const backUrl = url.replace(`/${params.query}`, '');
    const { myId, myData } = this.props;
    const { itemData } = this.state;
    let tags = '';
    if (itemData.length !== 0) {
      tags = Object.keys(itemData.tags).map((tag, index) => (
        <Link
          to={`/main/tag/${tag}`}
          key={tag + index}
          className="tag-link"
        >
          <Tag style={{ marginRight: 4, marginBottom: 2 }} />
          { tag }
        </Link>
      ));
    }
    let timestamp = '';
    if (itemData.createdOn) {
      timestamp = itemData.createdOn.slice(0, -3);
    }
    return (
      <div>
        <div className="item-detail-wrapper">
          <div className="user-image">
            <img src={itemData.imageUrl} alt="" />
          </div>
          <div className="user-info-wrapper" >
            <div className="user-info">
              <div>
                <div className="post-user" >
                  <Link to={`/main/${itemData.user}`}>
                    <div>
                      <img src={itemData.userImage} alt="user_image" />
                    </div>
                  </Link>
                  <Link to={`/main/${itemData.user}`}>
                    <h2>{itemData.userName}</h2>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item-comment" >
              <p>{itemData.text}</p>
              <p>{ timestamp }</p>
            </div>
            <div className="post-tag">
              { tags }
            </div>
            <div className="item-detail-component-wrapper" >
              <LikeButton data={itemData} />
              <Comment
                data={itemData}
                myId={myId}
                myData={myData}
                myComment
              />
            </div>
          </div>
          <Link to={backUrl}>
            <CloseIcon className="close-icon" />
          </Link>
        </div>
        <div className="mask" />
      </div>
    );
  }
}

export default ItemDetail;
