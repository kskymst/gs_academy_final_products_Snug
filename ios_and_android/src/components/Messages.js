import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

const { width } = Dimensions.get('window');

class Messages extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps === this.props) {
      return false;
    }
    return true;
  }

  render() {
    if (this.props.messages.length === 0) {
      return (
        <View>
          <Text style={styles.noDataText}>メッセージはありません</Text>
        </View>
      );
    }
    let messageList = <Text />;
    const myImage = (
      <Avatar
        medium
        rounded
        source={{ uri: this.props.myImage }}
        containerStyle={styles.myImage}
      />
    );
    const otherImage = (
      <Avatar
        medium
        rounded
        source={{ uri: this.props.userData.userImage }}
        containerStyle={styles.otherImage}
      />
    );
    if (this.props.messages !== '' && this.props.myId !== '') {
      messageList = this.props.messages.map((message) => {
        const postedDate = message.createdOn.slice(5, -3).replace('_', '月').replace(' ', '日 ');
        if (message.postUserId === this.props.myId) {
          return (
            <View
              key={message.createdOn}
              style={styles.myMessage}
            >
              { myImage }
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
        }
        return (
          <View
            key={message.createdOn}
            style={styles.otherMessage}
          >
            { otherImage }
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
      });
    }

    return (
      <View style={styles.inner} >
        {messageList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noDataText: {
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: width / 2,
  },
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
    marginRight: 8,
  },
  otherTextOuter: {
    marginRight: 'auto',
  },
  otherText: {
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
