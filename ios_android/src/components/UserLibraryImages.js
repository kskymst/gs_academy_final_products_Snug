import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

export default class UserLibraryImages extends React.Component {
    render () {
        return (
            <View style={styles.container}>
                    <Image source={require('../../assets/unused01.jpg')} style={styles.userImage} />
                    <Image source={require('../../assets/unused01.jpg')} style={styles.userImage} />
                    <Image source={require('../../assets/unused01.jpg')} style={styles.userImage} />
                    <Image source={require('../../assets/unused01.jpg')} style={styles.userImage} />
                    <Image source={require('../../assets/unused01.jpg')} style={styles.userImage} />
                    <Image source={require('../../assets/unused01.jpg')} style={styles.userImage} />
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
    userImage: {
        height:200,
        width:150,
        marginTop: 8,
    },

})

