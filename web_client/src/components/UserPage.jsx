import React from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import { Button } from 'semantic-ui-react';

import ImageList from './ImageList';
import ItemDetail from '../components/ItemDetail';


class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      want: true,
      favorite: false,
      clothete: false,
      userData: [],
      allDataList: [],
      dataList: [],
    };
    this.filterDataList = this.filterDataList.bind(this);
  }

  componentWillMount() {
    const userId = this.props.match.params.id;
    const db = firebase.firestore();
    db.collection('users').doc(userId)
      .get()
      .then((querySnapshot) => {
        this.setState({
          userData: querySnapshot.data(),
        });
      })
      .catch(() => {
        const { history } = this.props;
        history.push('/404');
      });
    const allDataList = [];
    const dataList = [];
    db.collection(`users/${userId}/status`).orderBy('createdOnNumber', 'desc')
      .get()
      .then((_querySnapshot) => {
        _querySnapshot.forEach((doc) => {
          db.collection('collections').doc(doc.id)
            .get()
            .then((__querySnapshot) => {
              const combineData = Object.assign(doc.data(), __querySnapshot.data());
              allDataList.push(combineData);
              if (combineData.want) {
                dataList.push(combineData);
              }
              this.setState({
                allDataList,
                dataList,
              });
            });
        });
      });
  }

  filterDataList(status) {
    const allDataList = this.state.allDataList;
    const dataList = [];
    for (let i = 0, len = allDataList.length; len > i; i += 1) {
      if (allDataList[i][status]) {
        dataList.push(allDataList[i]);
      }
    }
    if (status === 'want') {
      this.setState({
        want: true,
        favorite: false,
        clothete: false,
        dataList,
      });
    } else if (status === 'favorite') {
      this.setState({
        want: false,
        favorite: true,
        clothete: false,
        dataList,
      });
    } else {
      this.setState({
        want: false,
        favorite: false,
        clothete: true,
        dataList,
      });
    }
  }

  render() {
    return (
      <div className="user-page-wrapper" >
        <div
          className="user-page-top"
          style={{ backgroundImage: `url(${this.state.userData.backgroundImage})` }}
        >
          <img src={this.state.userData.userImage} alt="" />
          <h2>{this.state.userData.userName}</h2>
          <p>{this.state.userData.userText}</p>
          <Button.Group>
            <Button
              active={this.state.want}
              className="status-button"
              onClick={() => this.filterDataList('want')}
            >
              Want
            </Button>
            <Button
              active={this.state.favorite}
              className="status-button"
              onClick={() => this.filterDataList('favorite')}
            >
              Favorite
            </Button>
            <Button
              active={this.state.clothete}
              className="status-button"
              onClick={() => this.filterDataList('clothete')}
            >
              Clothete
            </Button>
          </Button.Group>
        </div>
        <ImageList
          dataList={this.state.dataList}
          query={this.props.match.url}
        />
        <Route
          exact
          path="/main/:id/:query"
          render={props => <ItemDetail {...props} />}
        />
      </div>
    );
  }
}

export default UserPage;
