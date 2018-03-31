import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// eslint-disable-next-line
class Messages extends React.Component {
  render() {
    const messageList = this.props.messages === '' ?
      (
        <View>
          <Text />
        </View>
      ) :
      this.props.messages.map((message) => {
        const postedDate = message.createdOn.slice(5, -3).replace('_', '月').replace(' ', '日 ');
        if (message.postUserId === this.props.myId) {
          return (
            <View
              key={message.createdOn}
              style={styles.myMessage}
            >
              <Image
                source={{ uri: this.props.myImage }}
                style={styles.myImage}
              />
              <View
                style={styles.myTextOuter}
              >
                <View
                  style={styles.myText}
                >
                  <Text style={styles.myInnerText}>{message.text}</Text>
                  <Text
                    style={styles.myPostDate}
                  >
                    {postedDate}
                  </Text>
                </View>
              </View>
            </View>
          );
        } else {
          return (
            <View
              key={message.createdOn}
              style={styles.otherMessage}
            >
              <Image
                source={{ uri: this.props.userData.userImage }}
                style={styles.otherImage}
              />
              <View
                style={styles.otherTextOuter}
              >
                <View
                  style={styles.otherText}
                >
                  <Text>{message.text}</Text>
                  <Text
                    style={styles.otherPostDate}
                  >
                    {postedDate}
                  </Text>
                </View>
              </View>
            </View>
          );
        }
      });
    return (
      <View style={styles.inner} >
        {messageList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inner: {
    flexGrow: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
  otherMessage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  otherImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  otherTextOuter: {
    marginRight: 'auto',
  },
  otherText: {
    // maxWidth: '80%',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
  },
  otherPostDate: {
    color: '#aaa',
    fontSize: 10,
    marginLeft: 'auto',
  },
  myImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  myMessage: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  myTextOuter: {
    marginRight: 'auto',
  },
  myText: {
    backgroundColor: '#7457A3',
    padding: 8,
    borderRadius: 8,
  },
  myInnerText: {
    color: '#fff',
  },
  myPostDate: {
    color: '#ccc',
    fontSize: 10,
    marginRight: 'auto',
  },
});

export default Messages;
