import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image,  Dimensions ,KeyboardAvoidingView } from 'react-native'

import TextInputForm from '../elements/TextInputForm'


export default class MessageScreen extends React.Component {
    // static navigationOptions = {
    //     headerTitle: 'Kosuke Yamashita',
    // }

    render() {
        return(
            <View style={styles.docs}>
                <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={60}    
                >
                    <ScrollView contentContainerStyle={styles.container} pagingEnabled={true}>
                        <View style={styles.inner}>
                            <View style={styles.otherMessage}>
                                <Image
                                    source={require('../../assets/sample.jpg')}
                                    style={styles.otherImage}
                                />
                                <View style={styles.otherText}>
                                    <Text>この間はありがとうございました！おかげさまでいい買い物ができました。また来月あたりにお伺いします！</Text>
                                    <Text style={styles.otherPostDate}>12月12日 12:34</Text>
                                </View>
                            </View>
                            <View style={styles.myMessage}>
                                <Image
                                    source={require('../../assets/sample.jpg')}
                                    style={styles.myImage}
                                />
                                <View style={styles.myText}>
                                    <Text style={styles.myInnerText}>この間はありがとうございました！おかげさまでいい買い物ができました。また来月あたりにお伺いします！</Text>
                                    <Text style={styles.myPostDate}>12月12日 12:34</Text>
                                </View>
                            </View>
                            <View style={styles.otherMessage}>
                                <Image
                                    source={require('../../assets/sample.jpg')}
                                    style={styles.otherImage}
                                />
                                <View style={styles.otherText}>
                                    <Text>この間はありがとうございました！おかげさまでいい買い物ができました。また来月あたりにお伺いします！</Text>
                                    <Text style={styles.otherPostDate}>12月12日 12:34</Text>
                                </View>
                            </View>
                            <View style={styles.myMessage}>
                                <Image
                                    source={require('../../assets/sample.jpg')}
                                    style={styles.myImage}
                                />
                                <View style={styles.myText}>
                                    <Text style={styles.myInnerText}>この間はありがとうございました！おかげさまでいい買い物ができました。また来月あたりにお伺いします！</Text>
                                    <Text style={styles.myPostDate}>12月12日 12:34</Text>
                                </View>
                            </View>
                            <View style={styles.otherMessage}>
                                <Image
                                    source={require('../../assets/sample.jpg')}
                                    style={styles.otherImage}
                                />
                                <View style={styles.otherText}>
                                    <Text>この間はありがとうございました！おかげさまでいい買い物ができました。また来月あたりにお伺いします！</Text>
                                    <Text style={styles.otherPostDate}>12月12日 12:34</Text>
                                </View>
                            </View>
                            <View style={styles.myMessage}>
                                <Image
                                    source={require('../../assets/sample.jpg')}
                                    style={styles.myImage}
                                />
                                <View style={styles.myText}>
                                    <Text style={styles.myInnerText}>この間はありがとうございました！おかげさまでいい買い物ができました。また来月あたりにお伺いします！</Text>
                                    <Text style={styles.myPostDate}>12月12日 12:34</Text>
                                </View>
                            </View>
                            <View style={styles.otherMessage}>
                                <Image
                                    source={require('../../assets/sample.jpg')}
                                    style={styles.otherImage}
                                />
                                <View style={styles.otherText}>
                                    <Text>この間はありがとうございました！おかげさまでいい買い物ができました。また来月あたりにお伺いします！</Text>
                                    <Text style={styles.otherPostDate}>12月12日 12:34</Text>
                                </View>
                            </View>
                            <View style={styles.myMessage}>
                                <Image
                                    source={require('../../assets/sample.jpg')}
                                    style={styles.myImage}
                                />
                                <View style={styles.myText}>
                                    <Text style={styles.myInnerText}>この間はありがとうございました！おかげさまでいい買い物ができました。また来月あたりにお伺いします！</Text>
                                    <Text style={styles.myPostDate}>12月12日 12:34</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.inputForm}>
                        <TextInputForm />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        height: Dimensions.get('window').height -180,
    },
    inner: {
        flexGrow: 1,
    },
    otherMessage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    otherImage: {
        width:40,
        height:40,
        borderRadius:20,
        marginRight: 8,
    },
    otherText: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 12,
    },
    otherPostDate: {
        color: '#aaa',
        fontSize:12,
        marginLeft: 'auto',
    },
    myImage: {
        width:40,
        height:40,
        borderRadius:20,
        marginLeft: 8,
    },
    myMessage: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    myText: {
        width: '80%',
        backgroundColor: '#7457A3',
        padding: 8,
        borderRadius: 12,
    },
    myInnerText: {
        color: '#fff',
    },
    myPostDate: {
        color: '#ccc',
        fontSize:12,
        marginRight: 'auto',
    },
    inputForm: {
        padding: 8,
    }
})