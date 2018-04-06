import React from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';

import ImageList from '../components/ImageList';
import ItemDetail from '../components/ItemDetail';

class TagSearchScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
    };
  }

  componentWillMount() {
    const { tagName } = this.props.match.params;
    const db = firebase.firestore();
    db.collection('collections')
      .where(`tags.${tagName}`, '==', true)
      .get()
      .then((querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => {
          dataList.push(doc.data());
        });
        this.setState({ dataList });
      });
  }

  render() {
    const { tagName } = this.props.match.params;
    const { dataList } = this.state;
    const imageData = dataList.length !== 0 ?
      { backgroundImage: `url(${dataList[0].imageUrl})` } :
      { backgroundColor: '#fff' };
    return (
      <div className="tag-search-wrapper" >
        <div
          className="tag-search-top"
          style={imageData}
        >
          <h3># {tagName}</h3>
          <p>全{dataList.length}件</p>
        </div>
        <ImageList
          dataList={this.state.dataList}
          query={this.props.match.url}
        />
        <Route
          exact
          path="/main/tag/:tagName/:query"
          render={props => (
            <ItemDetail
              myId={this.props.myId}
              myData={this.props.myData}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default TagSearchScreen;
