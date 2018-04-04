import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

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
    const { myId, myData } = this.props;
    const { itemData } = this.state;
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
        <Link to={`/main/${this.props.match.params.id}`}>
          <CloseIcon className="close-icon" />
        </Link>
        </div>
        <div className="mask" />
      </div>
    );
  }
}

export default ItemDetail;
