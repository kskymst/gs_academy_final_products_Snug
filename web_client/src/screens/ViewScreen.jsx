import React from 'react';
import firebase from 'firebase';
import { Route, Redirect } from 'react-router-dom';

import ResentPost from '../components/ResentPost';
import UserPage from '../components/UserPage';


// eslint-disable-next-line
class ViewScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
    };
  }

  componentWillMount() {
    const db = firebase.firestore();
    db.collection('collections').orderBy('createdOnNumber', 'desc')
      .onSnapshot((querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => {
          dataList.push(doc.data());
        });
        this.setState({ dataList });
      });
  }

  render() {
    const { myId, myData } = this.props;
    return (
      <div className="view-screen-wrapper" >
        <Route
          exact
          path="/main"
          render={() => (
            <ResentPost
              dataList={this.state.dataList}
              myId={myId}
              myData={myData}
            />
          )}
        />
        <Route
          path="/main/:id"
          render={props => (
            <UserPage
              dataList={this.state.dataList}
              myId={myId}
              myData={myData}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default ViewScreen;
