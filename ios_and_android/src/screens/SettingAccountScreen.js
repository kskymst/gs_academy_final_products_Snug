import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableHighlight, KeyboardAvoidingView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import UUID from 'uuid-v4';


const Dimensions = require('Dimensions');

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
    const imageRef = firebase.storage().ref('user').child(imageName);
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

// eslint-disable-next-line
class SettingAccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userText: '',
      userImage: '',
      backgroundImage: '',
      userImageUrl: '',
      backgroundImageUrl: '',
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { userData } = this.props.navigation.state.params;
    this.setState({
      userName: userData.userName,
      userText: userData.userText,
      userImage: userData.userImage,
      backgroundImage: userData.backgroundImage,
    });
  }

  pickImageHandler(userData) {
    ImagePicker.showImagePicker(
      {
        title: '画像を追加',
        takePhotoButtonTitle: '写真を撮る',
        chooseFromLibraryButtonTitle: 'カメラロールから選択',
        cancelButtonTitle: 'キャンセル',
        quality: 0.1,
        allowsEditing: true,
      },
      (res) => {
        if (res.didCancel) {
          // console.log('User Canselled');
        } else if (res.error) {
          // console.log('Error', res.error);
        } else {
          // eslint-disable-next-line
          userData === 'userImage' ?
            this.setState({
              userImage: res.uri,
            }) :
            this.setState({
              backgroundImage: res.uri,
            });
        }
      },
    );
  }

  handleSubmit() {
    this.setState({ loading: true });
    const uuid = UUID();
    const uploadedUserImage = uploadImage(this.state.userImage, uuid);
    uploadedUserImage
      .then((userImageUrl) => {
        this.setState({ userImageUrl });
        const uuid2 = UUID();
        const uploadedBackgroundImage = uploadImage(this.state.backgroundImage, uuid2);
        uploadedBackgroundImage
          .then((backgroundImageUrl) => {
            this.setState({ backgroundImageUrl });
            const { currentUser } = firebase.auth();
            const db = firebase.firestore();
            db.collection('users').doc(currentUser.uid)
              .update({
                userName: this.state.userName,
                userText: this.state.userText,
                userImage: this.state.userImageUrl,
                backgroundImage: this.state.backgroundImageUrl,
              })
              .then(() => {
                this.setState({
                  loading: false,
                });
                this.props.navigation.goBack();
              })
              .catch((err) => {
                console.log(err);
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
    return (
      <ScrollView style={styles.container} >
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={25}
          style={styles.container}
        >
          <View style={styles.imageArea}>
            <View style={styles.imageAreaInner}>
              <TouchableHighlight onPress={() => this.pickImageHandler('userImage')} underlayColor="transparent">
                { this.state.userImage === '' ?
                  <Image source={require('../../assets/sample.png')} style={styles.userImage} /> :
                  <Image source={{ uri: this.state.userImage }} style={styles.userImage} />
                }
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.pickImageHandler('userImage')} underlayColor="transparent">
                <Text style={styles.imageAreaText}>メインイメージを変更</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.imageAreaInner}>
              <TouchableHighlight onPress={() => this.pickImageHandler('backgroundImage')} underlayColor="transparent">
                { this.state.backgroundImage === '' ?
                  <Image source={require('../../assets/backgroundSample.jpg')} style={styles.backgroundImage} /> :
                  <Image source={{ uri: this.state.backgroundImage }} style={styles.backgroundImage} />
                }
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.pickImageHandler('backgroundImage')} underlayColor="transparent">
                <Text style={styles.imageAreaText}>バックグラウンドを変更</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.userInputArea}>
            <View style={styles.userInfo}>
              <Text style={styles.inputTitle}>ユーザーネーム:</Text>
              <TextInput
                style={styles.input}
                value={this.state.userName}
                onChangeText={text => this.setState({ userName: text })}
                autoCorrect={false}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.inputTitle}>自己紹介:</Text>
              <TextInput
                style={styles.input}
                value={this.state.userText}
                multiline
                onChangeText={text => this.setState({ userText: text })}
                autoCorrect={false}
                autoCapitalize="none"
              />
            </View>
          </View>
          <Button
            text="設定"
            loading={this.state.loading}
            buttonStyle={styles.submitButton}
            onPress={this.handleSubmit}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 200,
    width: '100%',
    backgroundColor: '#222',
  },
  imageArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ccc',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 0.3,
    borderBottomColor: '#999',
  },
  imageAreaInner: {
    alignItems: 'center',
  },
  userImage: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 6,
    backgroundColor: '#999',
  },
  backgroundImage: {
    width: width / 2.2,
    height: width / 3,
  },
  imageAreaText: {
    color: 'blue',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
    padding: 16,
  },
  inputTitle: {
    width: width / 3,
    fontSize: 14,
  },
  input: {
    width: width / 1.8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
    paddingBottom: 2,
  },
  submitButton: {
    width: width / 1.2,
    height: 36,
    marginTop: 40,
    backgroundColor: '#44B26B',
  },
});


export default SettingAccountScreen;
