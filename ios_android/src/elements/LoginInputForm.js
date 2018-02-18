import React from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'


const LoginInputForm = () => {
    return(
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={25}
            style={styles.container}
        >
                <Text style={styles.title}>ようこそSnugへ</Text>
                <View style={styles.inputsOuter}>
                    <TextInput
                        style={styles.input}
                        placeholder="メールアドレス"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="パスワード"
                    />
                </View>
                <Button
                large
                backgroundColor='#8E46FF'
                icon={{name:'exit-to-app'}}
                title='Login'
                buttonStyle={styles.button}
                />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'center',
        paddingBottom: 30,
    },
    inputsOuter:{
        alignItems: 'center',
    },
    input: {
        width: 280,
        fontSize: 18,
        backgroundColor: '#fff',
        borderRadius: 30,  
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 20,
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

export default LoginInputForm
