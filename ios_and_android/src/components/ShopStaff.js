import React from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';


const ShopStaff = props => (
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


export default ShopStaff;
