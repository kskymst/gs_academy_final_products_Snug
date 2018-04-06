import React from 'react';
import { Link } from 'react-router-dom';

import BadIcon from 'react-icons/lib/fa/frown-o';

const ImageList = (props) => {
  let images = [];
  if (props.dataList.length === 0) {
    images = (
      <div className="case-of-null">
        <BadIcon size="48" />
        <p>登録がありません</p>
      </div>
    );
  } else {
    images = props.dataList.map(data => (
      <Link
        to={`${props.query}/${data.id}`}
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
};

export default ImageList;
