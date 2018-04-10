import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Visitor = (props) => {
  const visitor = props.visitorList.map((data) => {
    const d = data.visitedOn;
    const visitedTime = `${d.getMonth() + 1}月${d.getDate()}日 ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
    return (
      <div
        className="visitor-card"
        key={data.key}
      >
        <Link
          className="visitor-image"
          to={`/main/${data.userId}`}
        >
          <img
            src={data.userImage}
            alt=""
          />
        </Link>
        <p>{visitedTime}</p>
      </div>
    );
  });
  return (
    <React.Fragment>
      { visitor }
    </React.Fragment>
  );
};

export default Visitor;
