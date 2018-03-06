import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableHighlight } from 'react-native';
import { Button, CheckBox, Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';

const UUID = require('uuid-v4');
const atob = require('base-64').decode;

window.atob = atob;

const dateString = (date) => {
  if (date == null) { return ''; }
  const str = date.toISOString();
  const subStr = str.replace('T', ' ');
  return subStr.split('.')[0];
};

class CameraScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      pickedImaged: require('../../assets/addButton.png'),
      text: '',
      tags: [],
      tag: '',
      imageUrl: '',
      want: false,
      favorite: false,
      clothete: false,
      loading: false,
    };
    this.pickImageHandler = this.pickImageHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  pickImageHandler() {
    ImagePicker.showImagePicker(
      {
        title: '画像を追加',
        takePhotoButtonTitle: '写真を撮る',
        chooseFromLibraryButtonTitle: 'カメラロールから選択',
        cancelButtonTitle: 'キャンセル',
        quality: 0.3,
      },
      (res) => {
        if (res.didCancel) {
          // console.log('User Canselled');
        } else if (res.error) {
          // console.log('Error', res.error);
        } else {
          this.setState({
            pickedImaged: { uri: res.uri, data: res.data, fileName: res.fileName },
          });
        }
      },
    );
  }

  handleChange(tag) {
    const tagStr = tag.split(' ' || '　');
    this.setState({ tag, tags: tagStr });
  }

  handleSubmit() {
    this.setState({ loading: true });
    const storageRef = firebase.storage().ref();
    const uuid = UUID();
    const metadata = {
      contentType: 'image/jpeg',
    };
    const ref = storageRef.child(`images/${uuid}.jpg`);
    ref.putString(this.state.pickedImaged.data, 'base64', metadata)
      .then((snapshot) => {
        console.log('写真はok');
        this.setState({ imageUrl: snapshot.downloadURL });
        const { currentUser } = firebase.auth();
        // console.log(currentUser);
        const db = firebase.firestore();
        const timestamp = dateString(new Date());
        db.collection('collections').add({
          user: currentUser.uid,
          text: this.state.text,
          imageUrl: this.state.imageUrl,
          tags: this.state.tags,
          want: this.state.want,
          favorite: this.state.favorite,
          clothete: this.state.clothete,
          createdOn: timestamp,
        })
          .then(() => {
            console.log('success');
            this.setState({
              pickedImaged: require('../../assets/addButton.png'),
              text: '',
              tags: [],
              tag: '',
              imageUrl: '',
              want: false,
              favorite: false,
              clothete: false,
              loading: false,
            });
            this.props.navigation.navigate('Timeline');
          })
          .catch(() => {
            console.log('failed');
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let tagText;
    let tagValidate;
    if (this.state.tags[0] === '') {
      tagText = <Text />;
    } else {
      tagText = this.state.tags.map(text => <View key={text} style={styles.tag}><Text style={{ color: '#fff' }}># {text}</Text></View>);
    }
    return (
      <ScrollView style={styles.container} >
        <View style={styles.topContent} >
          <TextInput
            style={styles.contentInput}
            placeholder="テキストを入力"
            multiline
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TouchableHighlight onPress={this.pickImageHandler}>
            <Image source={this.state.pickedImaged} style={styles.images} />
          </TouchableHighlight>
        </View>
        <View style={styles.tagArea} >
          <Icon name="label-outline" size={25} />
          <Text style={styles.titles}>Tags</Text>
          <TextInput
            style={styles.tagInput}
            placeholder="テキスト+スペースで作成できます"
            autoCorrect={false}
            autoCapitalize="none"
            value={this.state.tag}
            onChangeText={this.handleChange}
          />
        </View>
        {tagValidate}
        <View style={styles.tags}>
          {tagText}
        </View>
        <View style={styles.statusArea}>
          <View>
            <Text style={styles.statusAreaTitle} >Status</Text>
          </View>
          <CheckBox
            title="Want"
            checkedIcon="heart-o"
            uncheckedIcon="heart"
            checked={this.state.want}
            checkedColor="#FF1494"
            onPress={() => this.setState({ want: !this.state.want })}
            containerStyle={styles.checkBox}
          />
          <CheckBox
            title="Favorite"
            checkedIcon="star-o"
            uncheckedIcon="star"
            checked={this.state.favorite}
            checkedColor="#F3FF14"
            onPress={() => this.setState({ favorite: !this.state.favorite })}
            containerStyle={styles.checkBox}
          />
          <CheckBox
            title="My Clothete"
            checkedIcon="plus-square-o"
            uncheckedIcon="plus-square"
            checked={this.state.clothete}
            checkedColor="#16DD6C"
            onPress={() => this.setState({ clothete: !this.state.clothete })}
            containerStyle={styles.checkBox}
          />
        </View>
        <Button
          text="登録"
          loading={this.state.loading}
          buttonStyle={styles.submitButton}
          onPress={this.handleSubmit}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  contentInput: {
    padding: 8,
    borderWidth: 0.3,
    borderColor: '#aaa',
    width: '70%',
    height: 125,
    backgroundColor: '#fff',
  },
  images: {
    width: 93.98,
    height: 125,
    backgroundColor: '#999',
  },
  tagArea: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 3,
  },
  titles: {
    marginTop: 7,
  },
  tagInput: {
    borderWidth: 0.3,
    borderColor: '#aaa',
    width: '79%',
    maxHeight: 100,
    padding: 8,
    marginLeft: 5,
    alignSelf: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 8,
  },
  tag: {
    marginRight: 8,
    backgroundColor: '#7457A3',
    padding: 5,
    borderRadius: 50,
    marginBottom: 8,
  },
  statusAreaTitle: {
    fontSize: 16,
    marginLeft: 12,
    marginBottom: 4,
  },
  checkBox: {
    width: '100%',
    alignSelf: 'center',
    paddingLeft: 16,
    margin: -1,
    backgroundColor: '#fff',
  },
  submitButton: {
    width: 310,
    marginTop: 40,
    backgroundColor: '#44B26B',
  },
});

export default CameraScreen;
