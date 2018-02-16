import React from 'React'
import { Font } from 'expo'
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native'

import fontAwesome from '../../assets/fonts/fontawesome-webfont.ttf'

export default class TextInputForm extends React.Component {
    state = {
        fontLoaded: false,
      }

    async componentDidMount() {
        await Font.loadAsync({
          FontAwesome: fontAwesome,
        });
        this.setState({ fontLoaded: true });
      }
      
    render() {
        let bgColor = null

        if (this.props.children === '投稿する') {
            bgColor = '#fff';
        }

        return(
        <View style={[styles.commentInputArea,{ backgroundColor: bgColor }]}>
            <TextInput
                defaultValue=''
                placeholder="メッセージを入力"
                style={styles.commentInput}    
            />
            {
                this.state.fontLoaded ? (
            <TouchableHighlight style={styles.submitButton}>
                <Text style={styles.submitButtonText}>{this.props.children}</Text>
            </TouchableHighlight>
                ) : null
            } 
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
        borderRadius:20,
        padding:4,
        width:'75%',
    },
    submitButton: {
        padding:8,
        backgroundColor: '#44B26B',
        borderRadius: 8,
    },
    submitButtonText: {
        fontFamily: 'FontAwesome',
        color: '#fff',
    },
})