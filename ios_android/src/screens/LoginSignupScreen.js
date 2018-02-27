import React from 'react';
import { StyleSheet, View, Image, ImageBackground, StatusBar } from 'react-native';
import InputForm from '../components/InputForm';

// eslint-disable-next-line
export default class LoginSignupScreen extends React.Component {
	static navigationOptions = {
		header: false,
		tabBarVisible: false,
	}
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/unused01.jpg')}
          style={styles.container}
          blurRadius={20}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginTop: '20%',
  },
});
