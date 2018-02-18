import React from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'


class SignupInputForm extends React.Component {
    state={
        checked : true,
    }

    render() {
        return(
                <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={-28}
                    style={styles.container}
                >
                    <Text style={styles.title}>新規登録</Text>
                    <View style={styles.inputsOuter}>
                        <TextInput
                            style={styles.input}
                            placeholder="ユーザーネーム"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="メールアドレス"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="パスワード"
                        />
                    </View>
                    <View style={styles.checkBoxOuter}>
                        <CheckBox
                            title='Men'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.checked}
                            checkedColor = '#44B26B'    
                            onPress={() => this.setState({ checked: !this.state.checked })}
                            containerStyle={styles.checkBox}
                        />
                        <CheckBox
                            title='Women'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={!this.state.checked}
                            checkedColor = '#44B26B'  
                            onPress={() => this.setState({ checked: !this.state.checked })}
                            containerStyle={styles.checkBox}
                        />
                    </View>
                    <Button
                    large
                    backgroundColor='#8E46FF'
                    icon={{name:'done'}}
                    title='Submit'
                    buttonStyle={styles.button}
                    />
                </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'center',
        paddingBottom: 16,
    },
    inputsOuter:{
        alignItems: 'center',
    },
    input: {
        width: 280,
        fontSize: 18,
        backgroundColor: '#fff',
        borderRadius: 30,  
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 16,
    },
    checkBoxOuter: {
        flexDirection: 'row',
        justifyContent: 'center'     
    },
    checkBox:{
        width:120,
        borderRadius: 8,
    },
    button: {
        width: 280,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText:{
        color:'#fff',
        fontSize: 12,
    },
})

export default SignupInputForm
