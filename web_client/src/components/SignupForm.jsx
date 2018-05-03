import React from 'react';
import firebase from 'firebase';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UUID from 'uuid-v4';

import Human from 'react-icons/lib/md/perm-identity';
import MailOutline from 'react-icons/lib/md/mail-outline';
import VpnKey from 'react-icons/lib/md/vpn-key';
import Shop from 'react-icons/lib/md/location-city';
import Done from 'react-icons/lib/md/done';
import Next from 'react-icons/lib/io/android-arrow-forward';
import Back from 'react-icons/lib/io/android-arrow-back';

// eslint-disable-next-line
const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mail: '',
      password: '',
      shopType: '',
      page: 'first',
      userImageFile: '',
      backgroundImageFile: '',
      userImage: 'https://firebasestorage.googleapis.com/v0/b/snug-45a34.appspot.com/o/asset%2FaddUserImage.png?alt=media&token=b4158b3f-4066-4d29-8643-2b3ca38cb371',
      backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/snug-45a34.appspot.com/o/asset%2FaddBackgroundImage.png?alt=media&token=6da195f0-4ab6-4b76-9d11-9cbe981af543',
      loading: false,
      validate: false,
    };
    this.userImageChange = this.userImageChange.bind(this);
    this.backgroundChange = this.backgroundChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  userImageChange(e) {
    const files = e.target.files;

    const imageUrl = createObjectURL(files[0]);

    this.setState({
      userImage: imageUrl,
      userImageFile: files[0],
    });
  }

  backgroundChange(e) {
    const files = e.target.files;

    const imageUrl = createObjectURL(files[0]);

    this.setState({
      backgroundImage: imageUrl,
      backgroundImageFile: files[0],
    });
  }

  handleSubmit() {
    this.setState({ loading: true });
    if (
      this.state.userImage === 'https://firebasestorage.googleapis.com/v0/b/snug-45a34.appspot.com/o/asset%2FaddUserImage.png?alt=media&token=b4158b3f-4066-4d29-8643-2b3ca38cb371' ||
      this.state.backgroundImage === 'https://firebasestorage.googleapis.com/v0/b/snug-45a34.appspot.com/o/asset%2FaddBackgroundImage.png?alt=media&token=6da195f0-4ab6-4b76-9d11-9cbe981af543'
    ) {
      this.setState({
        loading: false,
        validate: true,
      });
      return;
    }
    const { history } = this.props;
    const uuid = UUID();
    const uuid2 = UUID();
    firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password)
      .then((user) => {
        const storageRef = firebase.storage().ref(`user/${uuid}.jpg`);
        storageRef.put(this.state.userImageFile)
          .then((snapshot) => {
            const userImage = snapshot.downloadURL;
            const storageRef2 = firebase.storage().ref(`user/${uuid2}.jpg`);
            storageRef2.put(this.state.backgroundImageFile)
              .then((snapshot2) => {
                const backgroundImage = snapshot2.downloadURL;
                const db = firebase.firestore();
                db.collection('users').doc(user.uid).set({
                  id: user.uid,
                  userName: this.state.name,
                  gender: this.state.shopType,
                  type: 'shop',
                  userText: '',
                  userImage,
                  backgroundImage,
                  datetime: new Date(),
                })
                  .then(() => {
                    history.push('/main');
                  })
                  .catch(() => {
                    storageRef.delete().then(() => {
                      storageRef2.delete().then(() => {
                        this.setState({
                          loading: false,
                          validate: true,
                        });
                      });
                    });
                  });
              })
              .catch(() => {
                storageRef.delete().then(() => {
                  storageRef2.delete().then(() => {
                    this.setState({
                      loading: false,
                      validate: true,
                    });
                  });
                });
              });
          });
      });
  }

  render() {
    const page = this.state.page === 'first' ? (
      <React.Fragment>
        <p>
          <Human style={{ fontSize: 32, margin: -4 }} />
          <input
            type="text"
            placeholder="ショップネーム"
            value={this.state.name}
            onChange={(e) => { this.setState({ name: e.target.value }); }}
          />
        </p>
        <p>
          <MailOutline />
          <input
            type="text"
            placeholder="メールアドレス"
            value={this.state.mail}
            onChange={(e) => { this.setState({ mail: e.target.value }); }}
          />
        </p>
        <p>
          <VpnKey />
          <input
            type="password"
            placeholder="パスワード"
            value={this.state.password}
            onChange={(e) => { this.setState({ password: e.target.value }); }}
          />
        </p>
        <div>
          <div className="select-wrap">
            <Shop style={{ fontSize: 28, marginRight: 8, marginLeft: -8 }} />
            <select onChange={(e) => { this.setState({ shopType: e.target.value }); }} >
              <option value="">ショップタイプを選択</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="both">Men & Women</option>
            </select>
          </div>
        </div>
        <button
          className="signup-button"
          onClick={() => this.setState({ page: 'second' })}
        >
          次へ
          <Next className="login-action-icon" />
        </button>
        <div className="login-button">
          <span>すでにアカウントをお持ちの方は</span>
          <Link to='/' >
            <button>ログイン</button>
          </Link>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Dimmer active={this.state.loading}>
          <Loader size="massive" />
        </Dimmer>
        <div className="userImage-area">
          <div className="setting-title">
            <p>プロフィール<br />画像を設定</p>
          </div>
          <label
            htmlFor="userImage"
          >
            <div
              style={{ backgroundImage: `url(${this.state.userImage})` }}
              className="signup-userImage"
            />
            <input
              type="file"
              id="userImage"
              ref="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={this.userImageChange}
            />
          </label>
        </div>
        <div className="background-area">
          <div className="setting-title">
            <p>背景画像<br />を設定</p>
          </div>
          <label
            htmlFor="backgroundImage"
          >
            <div
              style={{ backgroundImage: `url(${this.state.backgroundImage})` }}
              className="signup-backgroundImage"
            />
            <input
              type="file"
              id="backgroundImage"
              ref="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={this.backgroundChange}
            />
          </label>
        </div>
        <button
          className="signup-button"
          onClick={this.handleSubmit}
        >
          <Done className="login-action-icon" />
          Submit
        </button>
        <button
          className="back-button"
          onClick={() => this.setState({ page: 'first' })}
        >
          <Back className="login-action-icon" />
          戻る
        </button>
      </React.Fragment>
    );

    const validate = this.state.validate ? (
      <p className="validate-message" >
        ※ 入力に誤りがあります
      </p>
    ) : (
      ''
    );

    return (
      <div className="signup-form-area">
        <h2>Shop Signup</h2>
        { validate }
        { page }
      </div>
    );
  }
}

export default LoginForm;
