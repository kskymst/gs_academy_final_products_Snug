import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class UserLibraryImages extends React.Component {
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.imageArea}>
                    <Image source={require('../../assets/unused01.jpg')} style={styles.userImage} />
                    <Text style={styles.userImageTitle}>unused 18ss</Text>
                </View>
                <View style={styles.imageArea}>
                    <Image source={require('../../assets/unused01.jpg')} style={styles.userImage} />
                    <Text style={styles.userImageTitle}>unused 18ss</Text>
                </View>

                <View style={styles.imageArea}>
                    <Image source={require('../../assets/unused01.jpg')} style={styles.userImage} />
                    <Text style={styles.userImageTitle}>unused 18ss</Text>
                </View>
                <View style={styles.imageArea}>
                    <Image source={require('../../assets/unused01.jpg')} style={styles.userImage} />
                    <Text style={styles.userImageTitle}>unused 18ss</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    imageArea: {
        width:'48%',
        height:300,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    userImage: {
        width:'100%',
        height:'80%',
    },
    userImageTitle: {
        fontSize: 16,
        lineHeight: 55,
    }
})

export default UserLibraryImages
