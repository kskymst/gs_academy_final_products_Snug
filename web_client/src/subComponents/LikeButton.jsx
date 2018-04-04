import React from 'react';
import firebase from 'firebase';

import Star from 'react-icons/lib/md/star';
import Heart from 'react-icons/lib/md/favorite';
import Plus from 'react-icons/lib/fa/plus-square';
import StarOutline from 'react-icons/lib/md/star-outline';
import HeartOutline from 'react-icons/lib/md/favorite-outline';
import PlusOutline from 'react-icons/lib/fa/plus-square-o';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      want: false,
      favorite: false,
      clothete: false,
      wantQuantity: '',
      favoriteQuantity: '',
      clotheteQuantity: '',
    };
    this.likeButtonPush = this.likeButtonPush.bind(this);
  }

  componentWillMount() {
    if (this.props.data.length !== 0) {
      const { currentUser } = firebase.auth();
      const db = firebase.firestore();
      db.collection(`users/${currentUser.uid}/status`).doc(this.props.data.id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.data() !== undefined) {
            this.setState({
              want: querySnapshot.data().want,
              favorite: querySnapshot.data().favorite,
              clothete: querySnapshot.data().clothete,
            });
          }
          this.setState({
            wantQuantity: this.props.data.wantQuantity,
            favoriteQuantity: this.props.data.favoriteQuantity,
            clotheteQuantity: this.props.data.clotheteQuantity,
          });
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.data.id &&
       this.props.data !== nextProps.data &&
       !this.props.resentPost
    ) {
      const { currentUser } = firebase.auth();
      const db = firebase.firestore();
      db.collection(`users/${currentUser.uid}/status`).doc(nextProps.data.id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.data() !== undefined) {
            this.setState({
              want: querySnapshot.data().want,
              favorite: querySnapshot.data().favorite,
              clothete: querySnapshot.data().clothete,
            });
          }
          this.setState({
            wantQuantity: nextProps.data.wantQuantity,
            favoriteQuantity: nextProps.data.favoriteQuantity,
            clotheteQuantity: nextProps.data.clotheteQuantity,
          });
        });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) {
      return false;
    }
    return true;
  }

  likeButtonPush(status) {
    if (!this.state.loading) {
      this.setState({
        loading: true,
        [status]: !this.state[status],
      });
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
      db.collection(`users/${currentUser.uid}/status`).doc(this.props.data.id)
        .set(inputLikeType)
        .then(() => {
          const statusName = `${status}Quantity`;
          let quantity = this.state[statusName];
          // eslint-disable-next-line
          this.state[status] ? quantity += 1 : quantity -= 1 ;
          db.collection('collections').doc(this.props.data.id).update({
            [statusName]: quantity,
          });
          this.setState({
            [statusName]: quantity,
            loading: false,
          });
        });
    }
  }


  render() {
    return (
      <div className="like-button-wrapper" >
        <div>
          { this.state.want ?
            <Heart
              size="36"
              className="want-icon-true"
              onClick={() => this.likeButtonPush('want')}
            /> :
            <HeartOutline
              size="36"
              className="icon"
              onClick={() => this.likeButtonPush('want')}
            />
        }

          <p>Want ×{this.state.wantQuantity}</p>
        </div>
        <div>
          { this.state.favorite ?
            <Star
              size="36"
              className="favorite-icon-true"
              onClick={() => this.likeButtonPush('favorite')}
            /> :
            <StarOutline
              size="36"
              className="icon"
              onClick={() => this.likeButtonPush('favorite')}
            />
          }
          <p>Favorite ×{this.state.favoriteQuantity}</p>
        </div>

        <div>
          {
            this.state.clothete ?
              <Plus
                size="36"
                className="clothete-icon-true"
                onClick={() => this.likeButtonPush('clothete')}
              /> :
              <PlusOutline
                size="36"
                className="icon"
                onClick={() => this.likeButtonPush('clothete')}
              />
          }
          <p>Clothete ×{this.state.clotheteQuantity}</p>
        </div>
      </div>
    );
  }
}

export default LikeButton;
