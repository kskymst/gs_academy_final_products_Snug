import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { Dropdown, Image } from 'semantic-ui-react';

// eslint-disable-next-line
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isloggined: false,
      userName: '',
      userImage: '',
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        db.collection('users').doc(user.uid)
          .get()
          .then((querySnapshot) => {
            this.setState({
              isloggined: true,
              userName: querySnapshot.data().userName,
              userImage: querySnapshot.data().userImage,
            });
          });
      }
    });
  }

  render() {
    if (this.state.isloggined) {
      const trigger = (
        <span>
          <Image
            avatar
            src={this.state.userImage}
            className="avater"
          />
          {this.state.userName}
        </span>
      );
      return (
        <div className="header-wrapper">
          <div className="header-left" />
          <div className="header-logos">
            <Link to="/main" className="header-logos-inner">
              <img src="/img/icon.png" alt="bland-logo" />
              <p>Snug</p>
            </Link>
          </div>

          <div className="header-right" >
            <Dropdown
              trigger={trigger}
              direction="left"
              className="dropdown"
            >
              <Dropdown.Menu
                position="right"
                className="dropdown-menu"
              >
                <img
                  src={this.state.userImage}
                  alt=""
                />
                <Link
                  to="/main/add"
                >
                  <Dropdown.Item
                    text="  新規投稿"
                    icon="add"
                    className="link-text"
                  />
                </Link>
                <Link
                  to="/main/setting"
                >
                  <Dropdown.Item
                    text="  ユーザー設定"
                    icon="setting"
                    className="link-text"
                  />
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item
                  text="ログアウト"
                  icon="external"
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      );
    }
    return (
      <div className="header-wrapper">
        <div className="header-logos">
          <img src="/img/icon.png" alt="bland-logo" />
          <p>Snug</p>
        </div>
      </div>
    );
  }
}

export default Header;
