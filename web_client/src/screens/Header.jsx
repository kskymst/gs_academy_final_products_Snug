import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { Dropdown } from 'semantic-ui-react';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isloggined: false,
      userId: '',
      userName: '',
      userImage: '',
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        db.collection('users').doc(user.uid)
          .onSnapshot((querySnapshot) => {
            this.setState({
              isloggined: true,
              userId: user.uid,
              userName: querySnapshot.data().userName,
              userImage: querySnapshot.data().userImage,
            });
          });
      } else {
        this.setState({
          isloggined: false,
          userId: '',
          userName: '',
          userImage: '',
        });
      }
    });
  }

  handleLogout() {
    firebase.auth().signOut().then(() => {
      const { history } = this.props;
      history.push('/');
    });
  }

  render() {
    if (this.state.isloggined) {
      const trigger = (
        <span className="trigger">
          <span
            className="avater"
            style={{ backgroundImage: `url(${this.state.userImage})` }}
          />
          {this.state.userName}
        </span>
      );
      return (
        <div className="header-wrapper">
          <div className="header-left" />
          <div className="header-logos">
            <Link to="/main" className="header-logos-inner">
              <img src="/img/header_logo.png" alt="bland-logo" />
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
                <div
                  className="dropdown-user-image"
                  style={{ backgroundImage: `url(${this.state.userImage})` }}
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
                  to={`/main/${this.state.userId}`}
                >
                  <Dropdown.Item
                    text="  マイページ"
                    icon="user"
                    className="link-text"
                  />
                </Link>
                <Link
                  to="/main/addstaff"
                >
                  <Dropdown.Item
                    text="  スタッフを追加"
                    icon="add user"
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
                  onClick={this.handleLogout}
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
          <img src="/img/header_logo.png" alt="bland-logo" />
        </div>
      </div>
    );
  }
}

export default Header;
