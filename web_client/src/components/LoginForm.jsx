import React from 'react';
import { Link, browserHistory, Redirect } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import firebase from 'firebase';

import MailOutline from 'react-icons/lib/md/mail-outline';
import VpnKey from 'react-icons/lib/md/vpn-key';
import Exit from 'react-icons/lib/md/exit-to-app';
import Signup from 'react-icons/lib/md/portrait';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      validate: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ loading: true });
    const { history } = this.props;
    const db = firebase.firestore();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        db.collection('users').doc(user.uid)
          .get()
          .then((querySnapshot) => {
            const userData = querySnapshot.data();
            if (userData.type === 'customer') {
              this.setState({
                validate: true,
                loading: false,
              });
            } else {
              history.push('/main');
            }
          });
      })
      .catch(() => {
        this.setState({
          email: '',
          password: '',
          loading: false,
          validate: true,
        });
      });
  }

  render() {
    const validate = this.state.validate ? (
      <p className="validate-message">
        ※ ログイン情報が正しくありません
      </p>
    ) : (
      ''
    );
    return (
      <div className="login-form-area">
        <Dimmer active={this.state.loading}>
          <Loader size="massive" />
        </Dimmer>
        <h2>Shop Login</h2>
        { validate }
        <p>
          <MailOutline className="login-icons" />
          <input
            type="text"
            placeholder="メールアドレス"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </p>
        <p>
          <VpnKey className="login-icons" />
          <input
            type="password"
            placeholder="パスワード"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </p>
        <button
          className="login-button"
          onClick={this.handleSubmit}
        >
          <Exit className="login-action-icon" />Login
        </button>
        <Link to="/signup">
          <button className="signup-button"><Signup className="login-action-icon" />Signup</button>
        </Link>
      </div>
    );
  }
}

export default LoginForm;
