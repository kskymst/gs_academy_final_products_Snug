import React from 'react'
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight, ScrollView } from 'react-native'

import UserLibraryImages from '../components/UserLibraryImages'
 
class MypageScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <ImageBackground
                      source={require('../../assets/skate.jpg')}
                      style={styles.main}
                      blurRadius={1}
                    >
                        <Image
                        source={require('../../assets/sample.jpg')}
                        style={styles.userImage}
                        />
                        <Text style={styles.userName}>Kosuke Yamashita</Text>
                        <Text　style={styles.userDescription}>2017年10月よりプログラミングを始めた豆腐です。</Text>
                        <View style={styles.statusButtons}>
                            <TouchableHighlight style={styles.statusButton}>
                                <Text style={styles.statusButtonText}>want</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.statusButton}>
                                <Text style={styles.statusButtonText}>Favorite</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.statusButton}>
                                <Text style={styles.statusButtonText}>Collection</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.statusButton}>
                                <Text style={styles.statusButtonText}>Follow</Text>
                            </TouchableHighlight>
                        </View>
                    </ImageBackground>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <UserLibraryImages tabLabel="want" />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        justifyContent: 'center',
    },
    userName: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 1.5,
        margin: 8,
    },
    userDescription: {
        color: '#fff',
        fontSize: 12,
    },
    statusButtons: {
        flexDirection: 'row',
    },
    statusButton: {
        backgroundColor: '#A9A9A9',
        opacity: 0.5,
        height:28,
        width:'22%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    statusButtonText: {
        fontSize: 11,
    }
})

export default MypageScreen;