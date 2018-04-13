import React from 'react';
import firebase from 'firebase';
import { Route, Switch } from 'react-router-dom';

import ResentPost from '../components/ResentPost';
import UserPage from '../components/UserPage';
import AddScreen from './AddScreen';
import AddStaffScreen from './AddStaffScreen';
import SettingScreen from './SettingScreen';
import TagSearchScreen from './TagSearchScreen';

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
        <Switch>
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
            exact
            path="/main/add"
            render={props => (
              <AddScreen
                myId={myId}
                myData={myData}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/main/addstaff"
            render={props => (
              <AddStaffScreen
                myId={myId}
                myData={myData}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/main/setting"
            render={props => (
              <SettingScreen
                myId={myId}
                myData={myData}
                {...props}
              />
            )}
          />
          <Route
            path="/main/tag/:tagName"
            render={props => (
              <TagSearchScreen
                myId={myId}
                myData={myData}
                {...props}
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
                openMessageBox={this.props.openMessageBox}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default ViewScreen;
