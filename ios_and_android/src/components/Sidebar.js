import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const list = [
  {
    title: 'Messageを送る',
    icon: 'message',
    onPress: 'MessageRoom',
  },
  {
    title: 'Follow',
    icon: 'redo',
    onPress: 'FollowScreen',
  },
  {
    title: 'Follower',
    icon: 'supervisor-account',
    onPress: 'FollowerScreen',
  },
  {
    title: 'Account Setting',
    icon: 'account-circle',
    onPress: 'SettingAccount',
  },
];

const Sidebar = props => (
  <View style={styles.container} >
    <View style={styles.header} />
    <List containerStyle={styles.listOuter}>
      {
      list.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          leftIcon={{ name: item.icon }}
          containerStyle={styles.listItem}
          onPress={
            () => props.navigation.navigation.navigate(item.onPress, { userData: props.userData, userId: props.userId })
          }
        />
      ))
    }
    </List>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 70,
    width: '100%',
    backgroundColor: '#222',
    opacity: 0.7,
  },
  listOuter: {
    backgroundColor: '#fff',
    height: '100%',
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  listItem: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#cbd2d9',
  },
});

export default Sidebar;
