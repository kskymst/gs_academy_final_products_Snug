import React from 'react';
import { Link } from 'react-router-dom';

import BadIcon from 'react-icons/lib/fa/frown-o';

class ImageList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.dataList === this.props.dataList) {
      return false;
    }
    return true;
  }

  render() {
    let images = [];
    if (this.props.dataList.length === 0) {
      images = (
        <div className="case-of-null">
          <BadIcon size="48" />
          <p>登録がありません</p>
        </div>
      );
    } else {
      images = this.props.dataList.map(data => (
        <Link
          to={`${this.props.query}/${data.id}`}
          key={data.id}
          className="image-lists-outer"
        >
          <div style={{ backgroundImage: `url(${data.imageUrl})` }} />
        </Link>
      ));
    }
    return (
      <div className="image-lists">
        {images}
      </div>
    );
  }
}

export default ImageList;
