import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, TextInput, TouchableHighlight } from 'react-native';

const Dimensions = require('Dimensions');

const { width } = Dimensions.get('window');

// eslint-disable-next-line
class TextInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View style={styles.commentInputArea}>
        <TextInput
          value={this.state.text}
          multiline
          placeholder="メッセージを入力"
          style={styles.commentInput}
          onChangeText={text => this.setState({ text })}
        />
        <TouchableHighlight
          style={styles.submitButton}
          underlayColor="transparent"
          onPress={this.props.handleSubmit}
        >
          <Icon name="send" size={20} color="#fff" />
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
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    width: width / 1.3,
  },
  submitButton: {
    padding: 8,
    backgroundColor: '#44B26B',
    borderRadius: 60,
  },
  submitButtonText: {
    color: '#fff',
  },
});

export default TextInputForm;
