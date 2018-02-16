import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import ShopList from '../components/ShopList'

export default class ShopListScreen extends React.Component {
    render() {
        return(
            <ScrollView style={styles.container}  showsVerticalScrollIndicator={false}>
                <ShopList />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
})