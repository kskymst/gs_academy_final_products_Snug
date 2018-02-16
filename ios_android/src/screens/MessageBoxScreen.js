import React from 'react'
import { Font } from 'expo'
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableHighlight } from 'react-native'

import UserAccounts from '../components/UserAccounts'

import fontAwesome from '../../assets/fonts/fontawesome-webfont.ttf'


export default class MessageBoxScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Message',
        headerTitleStyle :{
            fontSize: 14,
            color: '#fff',
        },
        headerStyle:{
            backgroundColor: '#7457A3',
            height: 50,
        },
    }

    state = {
        fontLoaded: false,
      }

    async componentDidMount() {
        await Font.loadAsync({
          FontAwesome: fontAwesome,
        });
        this.setState({ fontLoaded: true });
      }

    render() {
        return(
            <View style={styles.container}>
                    {
                        this.state.fontLoaded ? (
                        <View style={styles.searchArea}>
                        <TextInput value={''} placeholder={'\uf002' + ' 検索'} style={[styles.searchInput, styles.icon]} />
                            <TouchableHighlight>
                                <Text style={[styles.newCreateButton, styles.icon]}>{'\uf044'}</Text>
                            </TouchableHighlight>
                        </View>
                        ) : null
                    }
                    <ScrollView  showsVerticalScrollIndicator={false}>
                        <UserAccounts />
                    </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        fontFamily: 'FontAwesome',
        fontWeight:'100',
    },
    searchArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
    },
    searchInput: {
        backgroundColor:'#ddd',
        width: '80%',
        fontSize: 18,
        padding:8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 30,
    },
    newCreateButton: {
        color:'#44B26B',
        fontSize: 32,
        marginLeft: 16,
    },
});