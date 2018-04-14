import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';

const { width } = Dimensions.get('window');

const ShopStaff = (props) => {
  console.log(props.shopStaffList)
  if (props.shopStaffList.length === 0) {
    return (
      <View>
        <Text style={styles.noDataText}>登録がありません</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View
        style={{
          height: 55 * props.shopStaffList.length + props.topComponentHeight,
          }}
      >
        {
          props.shopStaffList.map(data => (
            <ListItem
              key={data.key}
              roundAvatar
              avatar={{ uri: data.userImage }}
              title={data.userName}
              titleStyle={{ fontWeight: 'bold' }}
              containerStyle={{ backgroundColor: '#fff' }}
              onPress={() => props.navigation.navigate('MypageScreen', { user: data.key })}
            />
          ))
      }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noDataText: {
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: width / 4,
  },
});

export default ShopStaff;
