import React from 'react';
import firebase from 'firebase';

import ResentPost from '../components/ResentPost';

// eslint-disable-next-line
class ViewScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
    };
  }

  componentWillMount() {
    const db = firebase.firestore();
    db.collection('collections').orderBy('createdOnNumber', 'desc')
      .onSnapshot((querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => {
          dataList.push(doc.data());
        });
        this.setState({ dataList });
      });
  }

  render() {
    return (
      <div className="view-screen-wrapper" >
        <ResentPost dataList={this.state.dataList} />
      </div>
    );
  }
}

export default ViewScreen;
