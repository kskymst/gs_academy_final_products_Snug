import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { Button, CheckBox, Icon } from 'react-native-elements';

const Dimensions = require('Dimensions');

const { width } = Dimensions.get('window');

class SignupInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      gender: '',
      validationFlg: '',
      loadingIcon: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ loadingIcon: true });
    if (this.state.userName.length === 0 && this.state.userName.length <= 20) {
      this.setState({
        userName: '',
        validationFlg: 'userNameError',
        loadingIcon: false,
      });
      return;
    } else if (this.state.gender === '') {
      this.setState({
        validationFlg: 'genderError',
        loadingIcon: false,
      });
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        const db = firebase.firestore();
        db.collection('users').doc(user.uid).set({
          userName: this.state.userName,
          gender: this.state.gender,
          type: 'customer',
          userText: '',
          userImage: '',
          backgroundImage: '',
          datetime: new Date(),
        })
          .then((docref) => {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'TimeLine' }),
              ],
            });
            this.props.navigation.dispatch(resetAction);
          })
          .catch((error) => {
          });
      })
      .catch((error) => {
        this.setState({
          email: '',
          password: '',
          validationFlg: error.code,
          loadingIcon: false,
        });
      });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={25}
        style={styles.container}
      >
        <View style={styles.inputsOuter}>
          {(() => {
            if (this.state.validationFlg === 'genderError') {
              return (
                <Text style={styles.genderInvalid}>性別を入力してください。</Text>
              );
            } else if (this.state.validationFlg === 'auth/email-already-in-use') {
              return (
                <Text style={styles.genderInvalid}>そのメールアドレスは既に登録済みです</Text>
              );
            }
            return (
              <Text style={styles.title}>新規登録</Text>
            );
          })()
          }
          {(() => {
            if (this.state.validationFlg === 'userNameError') {
              return (
                <TextInput
                  style={styles.inputInvalid}
                  placeholder="1~20文字以内で入力してください"
                  value={this.state.userName}
                  onChangeText={text => this.setState({ userName: text })}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              );
            }
            return (
              <TextInput
                style={styles.input}
                placeholder="ユーザーネーム"
                value={this.state.userName}
                onChangeText={text => this.setState({ userName: text })}
                autoCorrect={false}
                autoCapitalize="none"
              />
            );
          })()
          }
          {(() => {
            if (this.state.validationFlg === 'auth/invalid-email') {
              return (
                <TextInput
                  style={styles.inputInvalid}
                  placeholder="無効なアドレスです"
                  value={this.state.email}
                  onChangeText={text => this.setState({ email: text })}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              );
             }
             return (
               <TextInput
                 style={styles.input}
                 placeholder="メールアドレス"
                 value={this.state.email}
                 onChangeText={text => this.setState({ email: text })}
                 autoCorrect={false}
                 autoCapitalize="none"
               />
              );
          })()
          }
          {(() => {
            if (this.state.validationFlg === 'auth/weak-password') {
              return (
                <TextInput
                  style={styles.inputInvalid}
                  placeholder="6文字以上で入力してください"
                  value={this.state.password}
                  onChangeText={text => this.setState({ password: text })}
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              );
            }
            return (
              <TextInput
                style={styles.input}
                placeholder="パスワード"
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
              />
              );
          })()
          }
        </View>
        <View style={styles.checkBoxOuter}>
          <CheckBox
            title="Men"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.gender === 'men' }
            checkedColor="#44B26B"
            onPress={() => this.setState({ gender: 'men' })}
            containerStyle={styles.checkBox}
          />
          <CheckBox
            title="Women"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.gender === 'women'}
            checkedColor="#44B26B"
            onPress={() => this.setState({ gender: 'women' })}
            containerStyle={styles.checkBox}
          />
        </View>
        <Button
          icon={
            <Icon
              type='font-awesome'
              name='check'
              size={22}
              color='white'
            />
          }
          loading={this.state.loadingIcon}
          text="Submit"
          buttonStyle={styles.button}
          onPress={this.handleSubmit}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 16,
  },
  genderInvalid: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F92020',
    alignSelf: 'center',
    paddingBottom: 16,
  },
  inputsOuter: {
    alignItems: 'center',
  },
  input: {
    width: width / 1.1,
    fontSize: 18,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
  },
  inputInvalid: {
    width: width / 1.1,
    fontSize: 18,
    backgroundColor: '#FFACAC',
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
  },
  checkBoxOuter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkBox: {
    width: width / 2.6,
    borderRadius: 8,
  },
  button: {
    width: width / 1.1,
    height: 50,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: '#8E46FF'
  },
});

export default SignupInputForm;
