import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import firebase from 'firebase';
import { Button, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

const Dimensions = require('Dimensions');

const { width } = Dimensions.get('window');

// eslint-disable-next-line
class LoginInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validationFlg: '',
      loadingIcon: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ loadingIcon: true });
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MainContents' }),
          ],
          key: null,
        });
        this.props.navigation.dispatch(resetAction);
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
      <View style={styles.container}>
        <Text style={styles.title}>ようこそSnugへ</Text>
        <View style={styles.inputsOuter}>
          {
            (() => {
              if (this.state.validationFlg === 'auth/invalid-email' || this.state.validationFlg === 'auth/user-not-found') {
                return (
                  <TextInput
                    style={styles.inputInvalid}
                    placeholder="アドレスが誤っています"
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
          {
            (() => {
              if (this.state.validationFlg === 'auth/wrong-password' || this.state.validationFlg === 'auth/user-not-found') {
                return (
                  <TextInput
                    style={styles.inputInvalid}
                    placeholder="パスワードが間違っています。"
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
        <Button
          icon={
            <Icon
              name="exit-to-app"
              color="white"
            />
          }
          loading={this.state.loadingIcon}
          text="Login"
          buttonStyle={styles.button}
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 30,
  },
  inputsOuter: {
    alignItems: 'center',
  },
  input: {
    width: width / 1.1,
    fontSize: 18,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 20,
  },
  inputInvalid: {
    width: width / 1.1,
    fontSize: 18,
    backgroundColor: '#FFACAC',
    borderRadius: 30,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 20,
  },
  button: {
    width: width / 1.1,
    height: 50,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: '#8E46FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default LoginInputForm;
