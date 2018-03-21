import React from 'react';
import { Route } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const TopPageScreen = () => (
  <div className="top-main-wrapper">
    <div className="top-main-title">
      <h1>ようこそSnugへ</h1>
      <p>Snugはお客様とショップスタッフの間で使える</p>
      <p>ショッピングアシスタントアプリです。</p>
    </div>
    <Route exact path="/" component={LoginForm} />
    <Route path="/signup" component={SignupForm} />
  </div>
);

export default TopPageScreen;
