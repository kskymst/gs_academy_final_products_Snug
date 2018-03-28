import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import firebase from 'firebase';


const Sidebar = (props) => {
  const { currentUser } = firebase.auth();
  const list = props.userId !== currentUser.uid ? (
    [
      {
        title: 'Messageを送る',
        icon: 'message',
        onPress: 'MessageRoom',
      },
      {
        title: 'フォロー',
        icon: 'redo',
        onPress: 'FollowScreen',
      },
      {
        title: 'フォロワー',
        icon: 'supervisor-account',
        onPress: 'FollowerScreen',
      },
    ]
  ) : (
    [
      {
        title: 'フォロー',
        icon: 'redo',
        onPress: 'FollowScreen',
      },
      {
        title: 'フォロワー',
        icon: 'supervisor-account',
        onPress: 'FollowerScreen',
      },
      {
        title: 'ユーザー情報変更',
        icon: 'account-circle',
        onPress: 'SettingAccount',
      },
      {
        title: 'ログアウト',
        icon: 'exit-to-app',
        onPress: 'logout',
      },
    ]
  );

  return (
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
            onPress={() => {
              if (item.onPress === 'logout') {
                firebase.auth().signOut().then(() => {
                  const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'LoginSignup' }),
                    ],
                    key: null,
                  });
                  props.navigation.dispatch(resetAction);
                });
              } else {
                props.navigation.navigate(item.onPress, { userData: props.userData, userId: props.userId });
                props.handleSubmit();
              }
            }
            }
          />
        ))
      }
      </List>
    </View>
  );
};

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
