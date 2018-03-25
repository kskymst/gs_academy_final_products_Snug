import React from 'react';
import firebase from 'firebase';
import { Route, Switch } from 'react-router-dom';

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
    return (
      <div className="view-screen-wrapper" >
        <Switch>
          <Route
            exact
            path="/main"
            render={() => <ResentPost dataList={this.state.dataList} />}
          />
          <Route
            path="/main/:id"
            component={UserPage}
          />
        </Switch>
      </div>
    );
  }
}

export default ViewScreen;
