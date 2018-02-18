import React from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native'

export default class ShopList extends React.Component {
    render() {
        return(
            <View>
                <TouchableHighlight style={styles.shopListCard} onPress={() => this.props.navigation.navigate('MypageScreen')} underlayColor="transparent">
                    <View>
                        <Image
                        source={require('../../assets/wism.jpg')}
                        style={styles.shopImage}
                        />
                        <Text style={styles.shopName}>Wism原宿店</Text>
                        <Text style={styles.visitDate}>Last Visit 3 month ago</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.shopListCard}>
                    <View>
                        <Image
                        source={require('../../assets/wism.jpg')}
                        style={styles.shopImage}
                        />
                        <Text style={styles.shopName}>Wism原宿店</Text>
                        <Text style={styles.visitDate}>Last Visit 3 month ago</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.shopListCard}>
                    <View>
                        <Image
                        source={require('../../assets/wism.jpg')}
                        style={styles.shopImage}
                        />
                        <Text style={styles.shopName}>Wism原宿店</Text>
                        <Text style={styles.visitDate}>Last Visit 3 month ago</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    shopListCard: {
        alignItems: 'center',
        marginTop: 12,
    },
    shopImage: {
        width: 300,
        height: 150,
        borderRadius: 24,
        position: 'relative',
    },
    shopName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        top:10,
        left:20,
    },
    visitDate: {
        color: '#fff',
        fontSize: 14,
        position: 'absolute',
        bottom:10,
        right: 20,
        textShadowColor: '#111',
        textShadowRadius: 3,
    },
})