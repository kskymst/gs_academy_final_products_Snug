import React from 'react';
import { Link } from 'react-router-dom';

import Human from 'react-icons/lib/md/perm-identity';
import MailOutline from 'react-icons/lib/md/mail-outline';
import VpnKey from 'react-icons/lib/md/vpn-key';
import Shop from 'react-icons/lib/md/location-city';
import Done from 'react-icons/lib/md/done';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mail: '',
      password: '',
      shopType: '',
    };
  }

  render() {
    return (
      <div className="signup-form-area">
        <h2>Shop Signup</h2>
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
        <Link to='/main' >
          <button className="signup-button"><Done className="login-action-icon" />Submit</button>
        </Link>
        <div className="login-button">
          <span>すでにアカウントをお持ちの方は</span>
          <Link to='/' >
            <button>ログイン</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginForm;
