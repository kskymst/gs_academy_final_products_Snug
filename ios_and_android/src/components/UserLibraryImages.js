import React from 'react';

import { StyleSheet, View, Image, TouchableHighlight, Dimensions, FlatList, ActivityIndicator } from 'react-native';

let { width, height } = Dimensions.get('window');
let minusMargin = 49.5;

if (height === 812) {
  height = 754;
  minusMargin = 26;
}

class UserLibraryImages extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.handleLazyLoad = this.handleLazyLoad.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.dataList });
  }

  handleLazyLoad({ viewableItems, changed }) {
    const newData = this.state.data.map(image =>
      viewableItems.find(({ item }) => item.id === image.id)
        ? { ...image, loaded: true }
        : image);
    this.setState({ data: newData });
  }

  renderItem({ item }) {
    const data = item;
    return (
      <TouchableHighlight
        style={styles.imageOuter}
        onPress={() => this.props.navigation.navigate('ItemDetail', { data })}
        underlayColor="transparent"
      >
        <React.Fragment>
          {
          item.loaded ? <Image
            source={{ uri: item.imageUrl }}
            style={styles.userImage}
          /> :
          <View style={styles.emptyImage} />
          }
        </React.Fragment>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          onViewableItemsChanged={this.handleLazyLoad}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          style={
            this.props.topComponentHeight ?
              { height: height - (this.props.topComponentHeight + minusMargin) } :
              { height: height - 110 }
            }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageOuter: {
    width: width / 3,
    height: width / 3,
    backgroundColor: '#EEE',
  },
  userImage: {
    height: width / 3.02,
    width: width / 3.02,
    marginBottom: 1,
    marginLeft: 0.5,
    marginRight: 0.5,
  },
  emptyImage: {
    height: width / 3.02,
    width: width / 3.02,
    marginBottom: 1,
    marginLeft: 0.5,
    marginRight: 0.5,
  },
});

export default UserLibraryImages;
