import React from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import { Button, Popup } from 'semantic-ui-react';
import Message from 'react-icons/lib/io/ios-chatbubble-outline';

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
    this.loadUserImage = this.loadUserImage.bind(this);
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.loadUserImage(this.props);
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.loadUserImage(nextProps);
    }
  }

  loadUserImage(props) {
    const userId = props.match.params.id;
    const db = firebase.firestore();
    db.collection('users').doc(userId)
      .get()
      .then((querySnapshot) => {
        this.setState({
          userData: querySnapshot.data(),
        });
      })
      .catch(() => {
        const { history } = props;
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
    const { allDataList } = this.state;
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
    const userId = this.props.match.params.id;
    let message = '';
    if (userId !== this.props.myId) {
      message = (
        <Popup
          trigger={
            <Message
              className="message-icon"
              onClick={() => this.props.openMessageBox(userId)}
            />
          }
          content="メッセージを送信する"
          position="bottom center"
          style={{ padding: 8, color: '#555', fontSize: 12 }}
        />
      );
    }
    return (
      <div className="user-page-wrapper" >
        <div
          className="user-page-top"
          style={{ backgroundImage: `url(${this.state.userData.backgroundImage})` }}
        >
          { message }
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
              Style
            </Button>
            <Button
              active={this.state.clothete}
              className="status-button"
              onClick={() => this.filterDataList('clothete')}
            >
              Closet
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
          render={props => (
            <ItemDetail
              myId={this.props.myId}
              myData={this.props.myData}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default UserPage;
