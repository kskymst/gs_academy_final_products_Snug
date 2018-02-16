import React from 'react'
import { ScrollView } from 'react-native'

import UserLibraryImages from '../components/UserLibraryImages'

export default class TimeLineScreen extends React.Component {
    render() {
        return(
            <ScrollView showsVerticalScrollIndicator={false}>
                <UserLibraryImages />
            </ScrollView>
        )
    }
}