import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableHighlight, Platform, ActivityIndicator, Dimensions } from 'react-native';
import { Button, CheckBox, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import UUID from 'uuid-v4';

const { width } = Dimensions.get('window');


const uploadImage = (uri, imageName, mime = 'image/jpg') => {
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  const tempWindowXMLHttpRequest = window.XMLHttpRequest;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    const imageRef = firebase.storage().ref('images').child(imageName);
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        window.XMLHttpRequest = tempWindowXMLHttpRequest;
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


class CameraScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      pickedImaged: require('../../assets/addButton.png'),
      text: '',
      tags: [],
      tag: '',
      userImage: '',
      imageUrl: '',
      want: false,
      favorite: false,
      clothete: false,
      userName: '',
      gender: 'men',
      shop: false,
      loading: false,
      validation: false,
      initialLoading: true,
    };
    this.pickImageHandler = this.pickImageHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection('users').doc(currentUser.uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.data().type === 'shop') {
          this.setState({
            userImage: querySnapshot.data().userImage,
            userName: querySnapshot.data().userName,
            shop: true,
            initialLoading: false,
          });
        } else {
          this.setState({
            userImage: querySnapshot.data().userImage,
            userName: querySnapshot.data().userName,
            gender: querySnapshot.data().gender,
            initialLoading: false,
          });
        }
      })
      .catch(() => {
        this.props.navigation.navigate('LoginSignup');
      });
  }

  pickImageHandler() {
    ImagePicker.showImagePicker(
      {
        title: '画像を追加',
        takePhotoButtonTitle: '写真を撮る',
        chooseFromLibraryButtonTitle: 'カメラロールから選択',
        cancelButtonTitle: 'キャンセル',
        quality: 0.4,
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
    if (this.state.pickedImaged.uri === undefined) {
      this.setState({
        loading: false,
        validation: true,
      });
      return;
    }
    let tags = {};
    this.state.tags.forEach((data) => {
      const subObj = { [data]: true };
      tags = Object.assign(tags, subObj);
    });
    const uuid = UUID();
    const base64Promise = uploadImage(this.state.pickedImaged.uri, uuid);
    base64Promise
      .then((imageUrl) => {
        this.setState({ imageUrl });
        const { currentUser } = firebase.auth();
        const db = firebase.firestore();
        const d = new Date();
        const second = (`0${d.getSeconds()}`).slice(-2);
        const timestamp = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}時${d.getMinutes()}分${second}秒`;
        const wantQuantity = this.state.want ? 1 : 0;
        const favoriteQuantity = this.state.favorite ? 1 : 0;
        const clotheteQuantity = this.state.clothete ? 1 : 0;
        db.collection('collections').doc(uuid).set({
          id: uuid,
          user: currentUser.uid,
          text: this.state.text,
          imageUrl: this.state.imageUrl,
          tags,
          userName: this.state.userName,
          userImage: this.state.userImage,
          gender: this.state.gender,
          wantQuantity,
          favoriteQuantity,
          clotheteQuantity,
          createdOn: timestamp,
          createdOnNumber: d,
        })
          .then(() => {
            db.collection(`users/${currentUser.uid}/status`).doc(uuid)
              .set({
                want: this.state.want,
                favorite: this.state.favorite,
                clothete: this.state.clothete,
                createdOnNumber: d,
              })
              .then(() => {
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
                  validation: false,
                });
                const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: 'MainContents' }),
                  ],
                  key: null,
                });
                this.props.navigation.dispatch(resetAction);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.initialLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#777" />
        </View>
      );
    }
    let tagText;
    let tagValidate;
    let validation = <View />;
    if (this.state.validation) {
      validation = (
        <View>
          <Text style={styles.validationMessage}>
            画像は必ず選択してください
          </Text>
        </View>
      );
    }
    if (this.state.tags[0] === '') {
      tagText = <Text />;
    } else {
      tagText = this.state.tags.map(text => (
        <View key={text} style={styles.tag}>
          <Icon type="font-awesome" name="tag" size={18} color="#333" />
          <Text style={styles.tagName}>
            {text}
          </Text>
        </View>
      ));
    }
    return (
      <ScrollView style={styles.container} >
        { validation }
        <View style={styles.topContent} >
          <TextInput
            style={styles.contentInput}
            placeholder="テキストを入力"
            multiline
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TouchableHighlight
            onPress={this.pickImageHandler}
            underlayColor="transparent"
          >
            <Image source={this.state.pickedImaged} style={styles.images} />
          </TouchableHighlight>
        </View>
        <View style={styles.tagArea} >
          <Text style={styles.titles}>Tags </Text>
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
        { this.state.shop ? (
          <View style={styles.genderCheckBoxOuter}>
            <CheckBox
              title="Men"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.gender === 'men' }
              checkedColor="#7457A3"
              onPress={() => this.setState({ gender: 'men' })}
              containerStyle={this.state.gender === 'men' ? styles.genderChecked : styles.genderUnchecked}
            />
            <CheckBox
              title="Women"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.gender === 'women'}
              checkedColor="#7457A3"
              onPress={() => this.setState({ gender: 'women' })}
              containerStyle={this.state.gender === 'women' ? styles.genderChecked : styles.genderUnchecked}
            />
          </View>
        ) : (
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
              title="Style"
              checkedIcon="star-o"
              uncheckedIcon="star"
              checked={this.state.favorite}
              checkedColor="#F3FF14"
              onPress={() => this.setState({ favorite: !this.state.favorite })}
              containerStyle={styles.checkBox}
            />
            <CheckBox
              title="Closet"
              checkedIcon="plus-square-o"
              uncheckedIcon="plus-square"
              checked={this.state.clothete}
              checkedColor="#16DD6C"
              onPress={() => this.setState({ clothete: !this.state.clothete })}
              containerStyle={styles.checkBox}
            />
          </View>
        )}

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
    marginLeft: -1,
  },
  tagArea: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 3,
  },
  titles: {
    fontSize: 16,
    marginTop: 7,
    marginLeft: 12,
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
    paddingRight: 8,
    paddingLeft: 8,
  },
  tag: {
    flexDirection: 'row',
    marginRight: 12,
    marginBottom: 8,
  },
  tagName: {
    fontSize: 18,
    marginLeft: 4,
    paddingBottom: 3,
  },
  genderCheckBoxOuter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  genderChecked: {
    width: width / 2.3,
    borderRadius: 8,
    borderColor: '#7457A3',
    backgroundColor: '#fff',
  },
  genderUnchecked: {
    width: width / 2.3,
    borderRadius: 8,
    borderColor: '#aaa',
    backgroundColor: '#fff',
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
    height: 36,
    marginTop: 20,
    backgroundColor: '#44B26B',
  },
  validationMessage: {
    color: '#f00',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default CameraScreen;
