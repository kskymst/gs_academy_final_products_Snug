import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import firebase from 'firebase';
import UUID from 'uuid-v4';

import Star from 'react-icons/lib/md/star';
import Heart from 'react-icons/lib/md/favorite';
import Plus from 'react-icons/lib/fa/plus-square';
import StarOutline from 'react-icons/lib/md/star-outline';
import HeartOutline from 'react-icons/lib/md/favorite-outline';
import PlusOutline from 'react-icons/lib/fa/plus-square-o';
import Tag from 'react-icons/lib/fa/tag';
import Photo from 'react-icons/lib/ti/image';
import Text from 'react-icons/lib/fa/file-text-o';

const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class AddScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      image: '/img/addButton.png',
      imageFile: '',
      tags: [],
      tag: '',
      want: false,
      favorite: false,
      clothete: false,
      loading: false,
      redirect: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(tag) {
    const tagStr = tag.split(' ' || '　');
    this.setState({ tag, tags: tagStr });
  }

  imageChange(e) {
    const files = e.target.files;
    if (files.length !== 0) {
      const imageUrl = createObjectURL(files[0]);
      this.setState({
        image: imageUrl,
        imageFile: files[0],
      });
    }
  }

  handleSubmit() {
    this.setState({ loading: true });
    let tags = {};
    this.state.tags.forEach((data) => {
      const subObj = { [data]: true };
      tags = Object.assign(tags, subObj);
    });
    const uuid = UUID();
    const storageRef = firebase.storage().ref(`images/${uuid}.jpg`);
    storageRef.put(this.state.imageFile)
      .then((snapshot) => {
        const db = firebase.firestore();
        const d = new Date();
        const second = (`0${d.getSeconds()}`).slice(-2);
        const timestamp = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDay() + 1}日 ${d.getHours()}時${d.getMinutes()}分${second}秒`;
        const wantQuantity = this.state.want ? 1 : 0;
        const favoriteQuantity = this.state.favorite ? 1 : 0;
        const clotheteQuantity = this.state.clothete ? 1 : 0;
        db.collection('collections').doc(uuid).set({
          id: uuid,
          user: this.props.myId,
          text: this.state.text,
          imageUrl: snapshot.downloadURL,
          tags,
          userName: this.props.myData.userName,
          userImage: this.props.myData.userImage,
          gender: this.props.myData.gender,
          wantQuantity,
          favoriteQuantity,
          clotheteQuantity,
          createdOn: timestamp,
          createdOnNumber: d,
        })
          .then(() => {
            db.collection(`users/${this.props.myId}/status`).doc(uuid)
              .set({
                want: this.state.want,
                favorite: this.state.favorite,
                clothete: this.state.clothete,
                createdOnNumber: d,
              })
              .then(() => {
                this.setState({
                  redirect: true,
                });
              });
          });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/main" />;
    }
    let tagText;
    if (this.state.tags[0] === '') {
      tagText = <div />;
    } else {
      tagText = this.state.tags.map(text => (
        <div key={text} className="created-tag" >
          <Tag
            size={18}
            style={{ marginTop: 5, marginRight: 2 }}
          />
          <p>
            {text}
          </p>
        </div>
      ));
    }
    return (
      <div className="add-wrapper">
        <h2>新規投稿</h2>
        <div className="text-image" >
          <div>
            <p>
              <Text
                style={{ marginBottom: 3, marginRight: 5 }}
              />
              Text
            </p>
            <textarea
              rows="5"
              placeholder="内容を入力"
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
            />
          </div>
          <div className="photo-area">
            <p>
              <Photo
                size={24}
                style={{ marginBottom: 3, marginRight: 5 }}
              />
              Photo
            </p>
            <label
              htmlFor="userImage"
            >
              <div
                className="image"
                style={{ backgroundImage: `url(${this.state.image})` }}
              >
                <input
                  type="file"
                  id="userImage"
                  ref="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={this.imageChange}
                />
              </div>
            </label>
          </div>
        </div>
        <div className="tag-area">
          <p>
            <Tag style={{ marginRight: 6 }} />
            Tag
          </p>
          <textarea
            rows="1"
            placeholder="タグの間はスペースで区切ってください"
            onChange={e => this.handleChange(e.target.value)}
          />
        </div>
        <div className="created-tag-area" >
          { tagText }
        </div>
        <div className="status-area">
          <div className="status-title">
            <HeartOutline style={{ fontSize: 24, marginRight: 5 }} />
            <p>
              Status
            </p>
          </div>
          <div
            className="icons"
            role="button"
            tabIndex={0}
            onClick={() => this.setState({ want: !this.state.want })}
            onKeyPress={() => this.setState({ want: !this.state.want })}
          >
            {
              this.state.want ?
                <Heart size={56} style={{ color: 'rgb(255, 0, 34)' }} /> :
                <HeartOutline size={56} />
            }
            <p>Want</p>
          </div>
          <div
            className="icons"
            role="button"
            tabIndex={0}
            onClick={() => this.setState({ favorite: !this.state.favorite })}
            onKeyPress={() => this.setState({ favorite: !this.state.favorite })}
          >
            {
              this.state.favorite ?
                <Star size={56} style={{ color: 'rgb(204, 238, 14)' }} /> :
                <StarOutline size={56} />
            }
            <p>Style</p>
          </div>
          <div
            className="icons"
            role="button"
            tabIndex={0}
            onClick={() => this.setState({ clothete: !this.state.clothete })}
            onKeyPress={() => this.setState({ clothete: !this.state.clothete })}
          >
            {
              this.state.clothete ?
                <Plus size={56} style={{ color: '#44B26B' }} /> :
                <PlusOutline size={56} />
            }
            <p>Closet</p>
          </div>
        </div>
        <div className="submit-button-area">
          <Button
            positive
            className="submit-button"
            loading={this.state.loading}
            onClick={this.handleSubmit}
          >
            投稿する
          </Button>
        </div>
      </div>
    );
  }
}

export default AddScreen;
