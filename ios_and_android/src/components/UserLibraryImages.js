import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';

const Dimensions = require('Dimensions');

const { width } = Dimensions.get('window');

// eslint-disable-next-line
class UserLibraryImages extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.dataList !== nextProps.dataList || nextState !== null) {
      return true;
    }
    return false;
  }


  render() {
    const dataList = this.props.dataList.map((data) => {
      return (
        <TouchableHighlight
          style={styles.imageOuter}
          key={data.key}
          onPress={() => this.props.navigation.navigate('ItemDetail', { data })}
          underlayColor="transparent"
        >
          <Image
            source={{ uri: data.imageUrl }}
            style={styles.userImage}
          />
        </TouchableHighlight>
      );
    });
    return (
      <View style={styles.container}>
        { dataList }
      </View>
    );
  }
}

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
