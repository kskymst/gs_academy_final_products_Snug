import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Text, Image, TouchableHighlight, ScrollView, ImageBackground, KeyboardAvoidingView, Dimensions } from 'react-native';
import firebase from 'firebase';

import ItemComment from '../components/ItemComment';
import LikeButtons from '../components/LikeButtons';

const { width } = Dimensions.get('window');

class ItemDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userImage: 'https://firebasestorage.googleapis.com/v0/b/snug-45a34.appspot.com/o/asset%2FuserImage.png?alt=media&token=9a26dd92-9024-442c-b38d-3b5dabf8e720',
    };
  }

  componentWillMount() {
    const { data } = this.props.navigation.state.params;
    const db = firebase.firestore();
    if (data.user === undefined) {
      data.user = '';
    }
    db.collection('users').doc(data.user)
      .get()
      .then((doc) => {
        this.setState({
          userImage: doc.data().userImage,
          userName: doc.data().userName,
        });
      });
  }

  render() {
    const { data } = this.props.navigation.state.params;
    const timestamp = data.createdOn.slice(0, -3);
    const tags = Object.keys(data.tags).map(tagName => (
      <TouchableHighlight
        key={tagName}
        underlayColor="transparent"
        onPress={() => this.props.navigation.navigate('TagSearch', { tagName })}
      >
        <View style={styles.tagOuter}>
          <Icon type="font-awesome" name="tag" size={18} color="#333" />
          <Text style={styles.tag}>{tagName}</Text>
        </View>
      </TouchableHighlight>
    ));
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={60}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={{ uri: data.imageUrl }}
            blurRadius={20}
            style={{ flex: 1 }}
          >
            <View style={styles.userInfoArea}>
              <View style={styles.userContent}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('MypageScreen', { user: data.user })} underlayColor="transparent">
                  <Image
                    source={{ uri: this.state.userImage }}
                    style={styles.userImage}
                  />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('MypageScreen', { user: data.user })} underlayColor="transparent">
                  <Text style={styles.userName}>{this.state.userName}</Text>
                </TouchableHighlight>
              </View>
              <Text style={styles.postDate}>{timestamp}</Text>
            </View>
            <View style={styles.ImageArea}>
              <Image source={{ uri: data.imageUrl }} style={styles.itemImage} />
            </View>
          </ImageBackground>
          <LikeButtons data={data} />
          <View style={styles.tagArea}>
            <View style={styles.tags}>
              { tags }
            </View>
          </View>
          <ItemComment data={data} navigation={this.props.navigation} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    height: 40,
    zIndex: 2,
  },
  userContent: {
    flexDirection: 'row',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  postDate: {
    fontSize: 10,
  },
  ImageArea: {
    width,
    height: width * 1.33,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  tagArea: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 14,
  },
  tagIndent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 12,
    paddingRight: 12,
  },
  tagOuter: {
    flexDirection: 'row',
    marginRight: 16,
  },
  tag: {
    fontSize: 20,
    marginBottom: 4,
    marginLeft: 4,
  },
});

export default ItemDetailScreen;
