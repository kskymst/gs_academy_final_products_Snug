import React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import UserLibraryImages from '../components/UserLibraryImages'

export default class TimeLineScreen extends React.Component {
    render() {
        return(
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <UserLibraryImages navigation={this.props.navigation}/>
            </ScrollView>
        )
    }
}