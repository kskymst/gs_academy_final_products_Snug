import React from 'react';
import { Input, Divider, Button } from 'semantic-ui-react';
import firebase from 'firebase';

import AddStaffList from '../components/AddStaffList';

class AddStaffScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      buttons: true,
      clickAction: '',
      dataList: [],
      searchedData: [],
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.visibleUserChange = this.visibleUserChange.bind(this);
  }

  componentWillMount() {
    const db = firebase.firestore();
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().type !== 'shop') {
            dataList.push(Object.assign(doc.data(), { key: doc.id, lowerUserName: doc.data().userName.toLowerCase() }));
          }
        });
        this.setState({
          dataList,
        });
      });
  }

  visibleUserChange(bool) {
    let searchedData = [];
    if (!bool) {
      searchedData = this.state.dataList.filter((item) => {
        if (item.shopId === this.props.myId) return true;
      });
    }
    this.setState({
      searchedData,
      buttons: bool,
      text: '',
    });
  }

  handleChange(e) {
    let searchedData = [];
    // 追加済みの表示の時
    if (!this.state.buttons) {
      searchedData = this.state.dataList.filter((item) => {
        if (item.shopId === this.props.myId) return true;
      });
      searchedData = searchedData.filter((item) => {
        if ((item.lowerUserName).indexOf(e.target.value.toLowerCase()) >= 0) return true;
      });
    } else { // データを文字列で検索
      searchedData = this.state.dataList.filter((item) => {
        if ((item.lowerUserName).indexOf(e.target.value.toLowerCase()) >= 0) return true;
      });
    }
    // 全ユーザーのテキスト0の時の非表示処理
    if (e.target.value === '' && this.state.buttons === true) {
      searchedData = [];
    }
    this.setState({ searchedData, text: e.target.value });
  }

  handleSubmit(userId, action) {
    if (!this.state.loading) {
      this.setState({
        loading: true,
        clickAction: userId,
      });
      const db = firebase.firestore();
      let shopId = '';
      let shopName = '';
      let type = 'customer';
      if (action === 'add') {
        shopId = this.props.myId;
        shopName = this.props.myData.userName;
        type = 'shopStaff';
      }
      db.collection('users').doc(userId)
        .update({
          shopId,
          shopName,
          type,
        })
        .then(() => {
          db.collection('users')
            .get()
            .then((querySnapshot) => {
              const dataList = [];
              querySnapshot.forEach((doc) => {
                dataList.push(Object.assign(doc.data(), { key: doc.id, lowerUserName: doc.data().userName.toLowerCase() }));
              });
              this.setState({
                dataList,
                loading: false,
              });
            });
        });
    }
  }

  render() {
    return (
      <div className="add-staff-wrapper">
        <h2>スタッフを追加</h2>
        <Divider />
        <div className="input-outer">
          <Input
            icon="search"
            size="large"
            placeholder="ユーザーを検索"
            className="search-input"
            style={{ borderColor: 'none' }}
            value={this.state.text}
            onChange={this.handleChange}
          />
        </div>
        <div className="group-buttons">
          <button
            className={this.state.buttons ?
              'group-button-true' :
              'group-button-false'
            }
            onClick={() => this.visibleUserChange(true)}
          >
            全ユーザー
          </button>
          <button
            className={this.state.buttons ?
              'group-button-false' :
              'group-button-true'
            }
            onClick={() => this.visibleUserChange(false)}
          >
            追加済みユーザー
          </button>
        </div>
        <AddStaffList
          myId={this.props.myId}
          searchedData={this.state.searchedData}
          handleSubmit={this.handleSubmit}
          clickAction={this.state.clickAction}
        />
      </div>
    );
  }
}

export default AddStaffScreen;
