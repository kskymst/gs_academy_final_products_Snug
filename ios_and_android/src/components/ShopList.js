import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, Dimensions} from 'react-native';
import { Card, Button, Icon, Divider } from 'react-native-elements'


const { width } = Dimensions.get('window');

// eslint-disable-next-line
export default class ShopList extends React.Component {
  render() {
    const shopList = this.props.shopDataList.length !== 0 ? (
      this.props.shopDataList.map (data => (
        <Card
          image={{ uri: data.backgroundImage }}
          key={data.id}
          containerStyle={styles.cardContainer}
          imageStyle={{ height: 200 }}
        >
          <View style={styles.cardTitle}>
            <Image
              source={{ uri: data.userImage }}
              style={styles.userImage}
            />
            <Text style={styles.cardTitleText}>{data.userName}</Text>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.cardText}>
            { data.userText }
          </Text>
          <Button
            text="投稿を見る"
            icon={
              <Icon
                name="arrow-forward"
                color="#7457A3"
                size={20}
              />
            }
            iconRight
            buttonStyle={styles.button}
            textStyle={styles.buttonTitle}
            onPress={() => this.props.navigation.navigate('MypageScreen', { user: data.id })}
            // onPress={() => console.log(data)}
          />
        </Card>
      ))
    ) : (
      <Text />
    );

    return (
      <View>
        { shopList }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardContainer: {
    margin: 6,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  divider: {
    backgroundColor: '#ddd',
    marginTop: 5,
    marginBottom: 10,
  },
  cardText: {
    marginTop: 5,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  button: {
    width: width / 1.2,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#7457A3',
  },
  buttonTitle: {
    color: '#7457A3',
    fontSize: 16,
  }
});
