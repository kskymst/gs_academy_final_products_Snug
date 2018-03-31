import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Visitor extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: '',
    };
    this.redirectPage = this.redirectPage.bind(this);
  }

  redirectPage(userId) {
    this.setState({ redirect: <Redirect push to={`/main/${userId}`} /> });
  }

  render() {
    const visitor = this.props.visitorList.map((data) => {
      const d = data.visitedOn;
      const visitedTime = `${d.getMonth() + 1}月${d.getDay()}日 ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`
      return (
        <Link
          className="visitor-card"
          key={data.key}
          to={`/main/${data.userId}`}
          // onClick={() => this.redirectPage(data.userId)}
        >
          <div className="visitor-image">
            <img
              src={data.userImage}
              alt=""
            />
          </div>
          <div className="visitor-info">
            <p>{data.userName}<span>さん</span></p>
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
  }
}

export default Visitor;
