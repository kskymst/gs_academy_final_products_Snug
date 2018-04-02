import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

import InputForm from '../components/InputForm';

const { height } = Dimensions.get('window');


// eslint-disable-next-line
export default class LoginSignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login : true,
    };
  }

	static navigationOptions = {
		header: false,
		tabBarVisible: false,
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MainContents' }),
          ],
          key: null,
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        this.setState({ login: false });
      }
    });
  }

  render() {
    const contents = this.state.login ? (
      <View style={styles.loadingIcon}>
        <ActivityIndicator size="large" color="#7457A3" />
      </View>
    ) : (
      <ImageBackground
        source={require('../../assets/login_background.png')}
        style={styles.container}
        blurRadius={1}
      >
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <Image
          source={require('../../assets/icon.png')}
          style={styles.icon}
        />
        <InputForm
          navigation={this.props.navigation}
        />
      </ImageBackground>
    );


    return (
      <View style={styles.container}>
        { contents }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIcon: {
    alignItems: 'center',
    marginTop: height / 2.2,
  },
  icon: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginTop: '20%',
  },
});
