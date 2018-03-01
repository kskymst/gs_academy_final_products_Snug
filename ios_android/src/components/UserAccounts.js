import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';

// eslint-disable-next-line
class UserAccounts extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Message')} underlayColor="transparent" >
                    <View style={styles.userArea}>
                        <Image
                        source={require('../../assets/sample.jpg')}
                        style={styles.userImage}
                        />
                        <View style={styles.userContents}>
                            <Text style={styles.userName}>Kosuke Yamashita</Text>
                            <Text style={styles.userMessage}>
                                本日はご来店ありがとうございました！フォローさせていただきますね〜！
                                本日はご来店ありがとうございました！フォローさせていただきますね〜！
                                本日はご来店ありがとうございました！フォローさせていただきますね〜！
                            </Text>
                        </View>
                        <Text style={styles.messageDate}>12:34</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={styles.userArea}>
                        <Image
                        source={require('../../assets/sample.jpg')}
                        style={styles.userImage}
                        />
                        <View style={styles.userContents}>
                            <Text style={styles.userName}>Kosuke Yamashita</Text>
                            <Text style={styles.userMessage}>
                                本日はご来店ありがとうございました！フォローさせていただきますね〜！
                                本日はご来店ありがとうございました！フォローさせていただきますね〜！
                                本日はご来店ありがとうございました！フォローさせていただきますね〜！
                            </Text>
                        </View>
                        <Text style={styles.messageDate}>12:34</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={styles.userArea}>
                        <Image
                        source={require('../../assets/sample.jpg')}
                        style={styles.userImage}
                        />
                        <View style={styles.userContents}>
                            <Text style={styles.userName}>Kosuke Yamashita</Text>
                            <Text style={styles.userMessage}>
                                本日はご来店ありがとうございました！フォローさせていただきますね〜！
                                本日はご来店ありがとうございました！フォローさせていただきますね〜！
                                本日はご来店ありがとうございました！フォローさせていただきますね〜！
                            </Text>
                        </View>
                        <Text style={styles.messageDate}>12:34</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    userImage: {
        width:50,
        height:50,
        borderRadius:25,
    },
    userArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width:'95%',
        height: 80 ,
        overflow:'hidden',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
    },
    userContents: {
        width:'60%',
        overflow: 'hidden',
        marginLeft: 8,
        marginRight: 8,
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    userMessage: {
        color: '#777',
        fontSize: 12,
    },
    messageDate: {
        marginBottom: 'auto',
        fontSize: 12,
    },
})

export default UserAccounts;
