import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import firebase from 'firebase';
import UUID from 'uuid-v4';


const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;


class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userDescription: '',
      userImage: '',
      userImageFile: '',
      backgroundImage: '',
      backgroundImageFile: '',
      loading: false,
      redirect: false,
    };
    this.userImageChange = this.userImageChange.bind(this);
    this.backgroundImageChange = this.backgroundImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.myData.length !== 0) {
      this.setState({
        userName: this.props.myData.userName,
        userDescription: this.props.myData.userText,
        userImage: this.props.myData.userImage,
        backgroundImage: this.props.myData.backgroundImage,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myData.length !== 0) {
      this.setState({
        userName: nextProps.myData.userName,
        userDescription: nextProps.myData.userText,
        userImage: nextProps.myData.userImage,
        backgroundImage: nextProps.myData.backgroundImage,
      });
    }
  }

  userImageChange(e) {
    const files = e.target.files;
    if (files.length !== 0) {
      const imageUrl = createObjectURL(files[0]);
      this.setState({
        userImage: imageUrl,
        userImageFile: files[0],
      });
    }
  }

  backgroundImageChange(e) {
    const files = e.target.files;
    if (files.length !== 0) {
      const imageUrl = createObjectURL(files[0]);
      this.setState({
        backgroundImage: imageUrl,
        backgroundImageFile: files[0],
      });
    }
  }

  updateMyinfo(userImage, backgroundImage) {
    const db = firebase.firestore();
    db.collection('users').doc(this.props.myId)
      .update({
        userName: this.state.userName,
        userText: this.state.userDescription,
        userImage,
        backgroundImage,
      })
      .then(() => {
        this.setState({
          redirect: true,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmit() {
    if (!this.state.loading) {
      this.setState({ loading: true });
      const uuid = UUID();
      const uuid2 = UUID();
      if (
        this.state.userImageFile === '' &&
        this.state.backgroundImageFile === ''
      ) {
        this.updateMyinfo(this.state.userImage, this.state.backgroundImage);
      } else if (this.state.userImageFile === '') {
        const storageRef = firebase.storage().ref(`images/${uuid}.jpg`);
        storageRef.put(this.state.backgroundImageFile)
          .then((snapshot) => {
            this.updateMyinfo(this.state.userImage, snapshot.downloadURL);
          });
      } else if (this.state.backgroundImageFile === '') {
        const storageRef = firebase.storage().ref(`images/${uuid}.jpg`);
        storageRef.put(this.state.userImageFile)
          .then((snapshot) => {
            this.updateMyinfo(snapshot.downloadURL, this.state.backgroundImage);
          });
      } else {
        const storageRef = firebase.storage().ref(`images/${uuid}.jpg`);
        storageRef.put(this.state.userImageFile)
          .then((snapshot) => {
            const storageRef2 = firebase.storage().ref(`images/${uuid2}.jpg`);
            storageRef2.put(this.state.backgroundImageFile)
              .then((snapshot2) => {
                this.updateMyinfo(snapshot.downloadURL, snapshot2.downloadURL);
              });
          });
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/main/${this.props.myId}`} />;
    }
    return (
      <div className="setting-wrapper">
        <h2>アカウント設定</h2>
        <div className="divider" />
        <div className="user-images-area">
          <div className="user-image">
            <label
              htmlFor="userImage"
            >
              <div
                style={{ backgroundImage: `url(${this.state.userImage})` }}
              >
                <input
                  type="file"
                  id="userImage"
                  // ref="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={this.userImageChange}
                />
              </div>
              <p>メインイメージを変更</p>
            </label>
          </div>
          <div className="background-image">
            <label
              htmlFor="backgroundImage"
            >
              <div
                style={{ backgroundImage: `url(${this.state.backgroundImage})` }}
              >
                <input
                  type="file"
                  id="backgroundImage"
                  // ref="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={this.backgroundImageChange}
                />
              </div>
              <p>バックグラウンドを変更</p>
            </label>
          </div>
        </div>
        <div className="shop-name-description-area">
          <div className="shop-name-area">
            <div>
              <p>ショップネーム:</p>
            </div>
            <input
              type="text"
              value={this.state.userName}
              onChange={e => this.setState({ userName: e.target.value })}
            />
          </div>
          <div className="shop-description-area">
            <div>
              <p>自己紹介:</p>
            </div>
            <textarea
              rows="6"
              placeholder="ショップの特徴、取扱ブランド、住所、営業時間等"
              value={this.state.userDescription}
              onChange={e => this.setState({ userDescription: e.target.value })}
            />
          </div>
        </div>
        <Button
          positive
          className="submit-button"
          loading={this.state.loading}
          onClick={this.handleSubmit}
        >
          設定
        </Button>
      </div>
    );
  }
}

export default SettingScreen;
