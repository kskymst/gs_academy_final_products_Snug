import React from 'react'
import { Icon } from 'react-native-elements'
import { StyleSheet, View, Text, Image, TouchableHighlight, ScrollView, ImageBackground, StatusBar,TextInput, KeyboardAvoidingView } from 'react-native'


import TextInputForm from '../elements/TextInputForm'

class ItemDetailScreen extends React.Component {
    static navigationOptions = {
        headerTitle: '写真',
        headerTitleStyle :{
            fontSize: 14,
            color: '#fff',
        },
        headerStyle:{
            backgroundColor: '#7457A3',
            height: 40,
        },
    };

    render () {
        return (
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={50}
            >
            <ScrollView showsVerticalScrollIndicator={false}>
               <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <ImageBackground
                source={require('../../assets/unused01.jpg')}
                style={styles.container}
                blurRadius={20}
                >
                    <View style={styles.userInfoArea}>
                        <View style={styles.userContent}>
                            <Image
                            source={require('../../assets/sample.jpg')}
                            style={styles.userImage}
                            />
                            <Text style={styles.userName}>Kosuke Yamashita</Text>
                        </View>
                        <Text style={styles.postDate}>2月13日 16:33</Text>
                    </View>
                    <View style={styles.ImageArea}>
                        <Image source={require('../../assets/unused01.jpg')} style={styles.itemImage} />
                    </View>
                    <View style={styles.reviewsArea}>
                        <TouchableHighlight style={styles.niceButton}>
                            <View>
                                <Icon name="favorite-border" size={22} color={'#B24C4A'}/>
                                <Text style={styles.niceAmount}>  Want  138</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.niceButton}>
                            <View>
                                <Icon name="star-border" size={22} color={'#B2B061'}/>
                                <Text style={styles.niceAmount}>  Favorite  38</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.niceButton}>
                            <View>
                                <Icon name="filter-none" size={22} color={'#44B26B'}/>
                                <Text style={styles.niceAmount}>  Collection 32</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.tagArea}>
                            <View style={styles.tagIndent}>
                                <Icon name="label-outline" size={22} color={'#000'}/>
                                <Text>Tags:</Text>
                            </View>
                            <View style={styles.tags}>
                                <Text style={styles.tag}># unused</Text>
                                <Text style={styles.tag}># street</Text>
                                <Text style={styles.tag}># 18ss</Text>
                                <Text style={styles.tag}># 18ss</Text>
                                <Text style={styles.tag}># 18ss</Text>
                            </View>
                    </View>
                    <View style={styles.commentArea}>
                        <View style={styles.commentIndent}>
                            <Icon name="chat-bubble-outline" size={22} color={'#000'}/>
                            <Text> Comment</Text>
                        </View>
                        <Text style={styles.commentContent}>
                        <Text style={styles.commentUserName}>Kosuke Yamashita </Text> 
                            unused 18ss
                            めっちゃいいよめっちゃいいよめっちゃいいよ
                            めっちゃいいよめっちゃいいよめっちゃいいよ
                            めっちゃいいよめっちゃいいよめっちゃいいよ
                            めっちゃいいよめっちゃいいよめっちゃいいよ
                            めっちゃいいよめっちゃいいよめっちゃいいよ
                        </Text>
                        <Text style={styles.commentContent}>
                        <Text style={styles.commentUserName}>松田滉太 </Text> 
                            ちょうどこれ入荷しましたよ！
                        </Text>
                    </View>
                <TextInputForm />
                </ImageBackground>
            </ScrollView>
                </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:10,
        paddingRight:10,
        paddingTop: 20,
        height:40,
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
        marginLeft: 24,
    },
    postDate: {
        fontSize:10,
    },
    ImageArea: {
        width:'100%',
        height:400,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    reviewsArea: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-around',
    },
    niceButton: {
        width: '32%',
        height: 40,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        opacity: 0.7,
    },
    niceAmount: {
        color:'#fff',
        fontSize: 12,
    },
    tagArea: {
        flexDirection: 'row',
        marginTop: 12,
        marginLeft: 14,
        marginBottom:16,
    },
    tagIndent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tags: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        color: '#fff',
        fontSize: 16,
        backgroundColor: '#333',
        padding:3,
        marginLeft: 8,
        marginBottom: 4,
    },
    commentArea: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 16,
    },
    commentIndent: {
        flexDirection: 'row',
    },
    commentUserName: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    commentContent: {
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        marginTop: 12,
    },
})

export default ItemDetailScreen
