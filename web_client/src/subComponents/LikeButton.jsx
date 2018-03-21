import React from 'react';

import StarOutline from 'react-icons/lib/md/star-outline';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      want: true,
      favorite: false,
      clothete: false,
    };
  }
  render() {
    return (
      <div className="like-button-wrapper" >
        <button
          className={this.state.want ? 'want-button-true' : null}
        >
          <StarOutline
            size="24"
            className={this.state.want ? 'want-icon-true' : null}
          />
          <p>Want ×{this.props.data.wantQuantity}</p>
        </button>
        <button
          className={this.state.want ? 'want-button-true' : null}
        >
          <StarOutline
            size="24"
            className={this.state.want ? 'want-icon-true' : null}
          />
          <p>Favorite ×{this.props.data.favoriteQuantity}</p>
        </button>
        <button
          className={this.state.want ? 'want-button-true' : null}
        >
          <StarOutline
            size="24"
            className={this.state.want ? 'want-icon-true' : null}
          />
          <p>Clothete ×{this.props.data.clotheteQuantity}</p>
        </button>
      </div>
    );
  }
}

export default LikeButton;
