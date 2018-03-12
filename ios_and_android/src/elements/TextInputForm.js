import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, TextInput, TouchableHighlight } from 'react-native';

// eslint-disable-next-line
class TextInputForm extends React.Component {
  render() {
    let bgColor = null;

    if (this.props.style === 'changeBackGround') {
      bgColor = '#fff';
    }

    return (
      <View style={[styles.commentInputArea,{ backgroundColor: bgColor }]}>
        <TextInput
          defaultValue=""
          placeholder="メッセージを入力"
          style={styles.commentInput}
        />
        <TouchableHighlight style={styles.submitButton}>
          <Icon name="send" size={18} color={'#fff'} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentInputArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 16,
    paddingRight: 8,
  },
  commentInput: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 20,
    padding: 4,
    width: '75%',
  },
  submitButton: {
    padding: 8,
    backgroundColor: '#44B26B',
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
  },
});

export default TextInputForm;
