import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Visitor = (props) => {
  const visitor = props.visitorList.map((data) => {
    const d = data.visitedOn;
    const visitedTime = `${d.getMonth() + 1}月${d.getDay() + 1}日 ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`
    return (
      <Link
        className="visitor-card"
        key={data.key}
        to={`/main/${data.userId}`}
      >
        <div className="visitor-image">
          <img
            src={data.userImage}
            alt=""
          />
        </div>
        <div className="visitor-info">
          <p>{data.userName}</p>
          <p>{visitedTime}</p>
        </div>
      </Link>
    );
  });
  return (
    <React.Fragment>
      { visitor }
    </React.Fragment>
  );
};

export default Visitor;
