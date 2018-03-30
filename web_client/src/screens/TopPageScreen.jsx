import React from 'react';
import { Route } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import firebase from 'firebase';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

class TopPageScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentWillMount() {
    // this.setState({ loading: true });
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     const { history } = this.props;
    //     history.push('/main');
    //   }
    //   this.setState({ loading: false });
    // });
  }
  render() {
    return (
      <div className="top-main-wrapper">
        <Dimmer active={this.state.loading}>
          <Loader size="massive" />
        </Dimmer>
        <div className="top-main-title">
          <h1>ようこそSnugへ</h1>
          <p>Snugはお客様とショップスタッフの間で使える</p>
          <p>ショッピングアシスタントアプリです。</p>
        </div>
        <Route exact path="/" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
      </div>
    );
  }
}

export default TopPageScreen;
