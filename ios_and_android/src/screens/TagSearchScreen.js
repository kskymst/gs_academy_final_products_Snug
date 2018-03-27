import React from 'react';
import { StyleSheet, Text, Dimensions, ImageBackground, ScrollView } from 'react-native';
import firebase from 'firebase';

import UserLibraryImages from '../components/UserLibraryImages';


const { width } = Dimensions.get('window');

// eslint-disable-next-line
class TagSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };
  }

  componentWillMount() {
    const { tagName } = this.props.navigation.state.params;
    const db = firebase.firestore();
    db.collection('collections')
      .where(`tags.${tagName}`, '==', true)
      .get()
      .then((querySnapshot) => {
        const dataList = [];
        querySnapshot.forEach((doc) => {
          dataList.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ dataList });
      });
  }

  render() {
    const { tagName } = this.props.navigation.state.params;
    const { dataList } = this.state;
    console.log(dataList[0]);
    const imageData = this.state.dataList.length !== 0 ?
      dataList[0].imageUrl :
      'https://firebasestorage.googleapis.com/v0/b/snug-45a34.appspot.com/o/asset%2FloadingScreen.png?alt=media&token=f3f91a93-c6b9-4bd4-910d-e18ed5469770'
    return (
      <ScrollView>
        <ImageBackground
          style={styles.topContents}
          source={{ uri: imageData }}
          blurRadius={5}
        >
          <Text style={styles.title}>
            # {tagName}
          </Text>
          <Text style={styles.subTitle} >全{dataList.length}件</Text>
        </ImageBackground>
        <UserLibraryImages navigation={this.props.navigation} dataList={dataList} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  topContents: {
    minHeight: width / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#ddd',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  subTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
    textShadowColor: '#aaa',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default TagSearchScreen;
