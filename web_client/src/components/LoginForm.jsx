import React from 'react';
import { Link } from 'react-router-dom';


import MailOutline from 'react-icons/lib/md/mail-outline';
import VpnKey from 'react-icons/lib/md/vpn-key';
import Exit from 'react-icons/lib/md/exit-to-app';
import Signup from 'react-icons/lib/md/portrait';

const LoginForm = () => (
  <div className="login-form-area">
    <h2>Shop Login</h2>
    <p>
      <MailOutline className="login-icons" />
      <input type="text" placeholder="メールアドレス" />
    </p>
    <p>
      <VpnKey className="login-icons" />
      <input type="password" placeholder="パスワード" />
    </p>
    <button className="login-button"><Exit className="login-action-icon" />Login</button>
    <Link to='/signup'>
      <button className="signup-button"><Signup className="login-action-icon" />Signup</button>
    </Link>
  </div>
);

export default LoginForm;
