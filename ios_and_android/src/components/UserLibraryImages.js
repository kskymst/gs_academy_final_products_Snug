import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const UserLibraryImages = (props) => {
  const dataList = props.dataList.map(data => (
    <TouchableHighlight
      style={styles.imageOuter}
      key={data.id}
      onPress={() => props.navigation.navigate('ItemDetail', { data })}
      underlayColor="transparent"
    >
      <Image
        source={{ uri: data.imageUrl }}
        style={styles.userImage}
      />
    </TouchableHighlight>
  ));
  return (
    <View style={styles.container}>
      { dataList }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  imageOuter: {
    width: '50%',
  },
  userImage: {
    height: width / 2.01,
    width: width / 2.01,
    marginBottom: 1,
    marginLeft: 0.5,
    marginRight: 0.5,
  },
});

export default UserLibraryImages;
