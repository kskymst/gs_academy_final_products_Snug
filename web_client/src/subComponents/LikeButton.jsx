import React from 'react';
import firebase from 'firebase';

import StarOutline from 'react-icons/lib/md/star-outline';
import HeartOutline from 'react-icons/lib/md/favorite-outline';
import PlusOutline from 'react-icons/lib/fa/plus-square-o';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      want: false,
      favorite: false,
      clothete: false,
      wantQuantity: this.props.data.wantQuantity,
      favoriteQuantity: this.props.data.favoriteQuantity,
      clotheteQuantity: this.props.data.clotheteQuantity,
    };
    this.likeButtonPush = this.likeButtonPush.bind(this);
  }

  likeButtonPush(status) {
    let inputLikeType = {};
    const timestamp = new Date();
    if (status === 'want') {
      inputLikeType = {
        want: !this.state.want,
        favorite: this.state.favorite,
        clothete: this.state.clothete,
        createdOnNumber: timestamp,
      };
    } else if (status === 'favorite') {
      inputLikeType = {
        want: this.state.want,
        favorite: !this.state.favorite,
        clothete: this.state.clothete,
        createdOnNumber: timestamp,
      };
    } else if (status === 'clothete') {
      inputLikeType = {
        want: this.state.want,
        favorite: this.state.favorite,
        clothete: !this.state.clothete,
        createdOnNumber: timestamp,
      };
    }
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/status`).doc(this.props.data.key).set(inputLikeType)
      .then(() => {
        const statusName = `${status}Quantity`;
        let quantity = this.state[statusName];
        // eslint-disable-next-line
        this.state[status] ? quantity += 1 : quantity -= 1 ;
        db.collection('collections').doc(this.props.data.key).update({
          [statusName]: quantity,
        });
        this.setState({
          [statusName]: quantity,
        });
      });
  }


  render() {
    return (
      <div className="like-button-wrapper" >
        <div>
          <HeartOutline
            size="36"
            className={this.state.want ? 'want-icon-true' : null}
            onClick={() => this.likeButtonPush('want')}
          />
          <p>Want ×{this.props.data.wantQuantity}</p>
        </div>

        <div>
          <StarOutline
            size="36"
            className={this.state.want ? 'favorite-icon-true' : null}
            onClick={() => this.likeButtonPush('favorite')}
          />
          <p>Favorite ×{this.props.data.favoriteQuantity}</p>
        </div>

        <div>
          <PlusOutline
            size="36"
            className={this.state.clothete ? 'clothete-icon-true' : null}
            onClick={() => this.likeButtonPush('clothete')}
          />
          <p>Clothete ×{this.props.data.clotheteQuantity}</p>
        </div>
      </div>
    );
  }
}

export default LikeButton;
