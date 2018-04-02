import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';

const { width } = Dimensions.get('window');

class LikeButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      want: false,
      favorite: false,
      clothete: false,
      wantQuantity: this.props.data.wantQuantity,
      favoriteQuantity: this.props.data.favoriteQuantity,
      clotheteQuantity: this.props.data.clotheteQuantity,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/status`).doc(this.props.data.id)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.data() !== undefined) {
          this.setState({
            want: querySnapshot.data().want,
            favorite: querySnapshot.data().favorite,
            clothete: querySnapshot.data().clothete,
          });
        }
      });
  }

  handleSubmit(status) {
    let inputLikeType = {};
    const timestamp = new Date();
    if (status === 'want') {
      inputLikeType = {
        want: !this.state.want,
        favorite: this.state.favorite,
        clothete: this.state.clothete,
        createdOnNumber: timestamp,
      };
    } else if (status === 'favorite') {
      inputLikeType = {
        want: this.state.want,
        favorite: !this.state.favorite,
        clothete: this.state.clothete,
        createdOnNumber: timestamp,
      };
    } else if (status === 'clothete') {
      inputLikeType = {
        want: this.state.want,
        favorite: this.state.favorite,
        clothete: !this.state.clothete,
        createdOnNumber: timestamp,
      };
    }
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/status`).doc(this.props.data.id).set(inputLikeType)
      .then(() => {
        const statusName = `${status}Quantity`;
        let quantity = this.state[statusName];
        // eslint-disable-next-line
        this.state[status] ? quantity += 1 : quantity -= 1 ;
        db.collection('collections').doc(this.props.data.id).update({
          [statusName]: quantity,
        });
        this.setState({
          [statusName]: quantity,
        });
      });
  }

  render() {
    return (
      <View style={styles.LikeButtonArea}>
        <TouchableOpacity
          style={[styles.button, this.state.want ? styles.checkedButton : styles.uncheckedButton]}
          onPress={() => this.handleSubmit('want')}
          underlayColor="transparent"
        >
          <View>
            <Icon
              name={this.state.want ? 'favorite' : 'favorite-border'}
              size={22}
              color={this.state.want ? '#B24C4A' : '#777'}
            />
            <Text
              style={[styles.buttonText, this.state.want ? styles.checkedText : styles.uncheckedText]}
            >
              Want  {this.state.wantQuantity}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, this.state.favorite ? styles.checkedButton : styles.uncheckedButton]}
          onPress={() => this.handleSubmit('favorite')}
          underlayColor="transparent"
        >
          <View>
            <Icon
              name={this.state.favorite ? 'star' : 'star-border'}
              size={22}
              color={this.state.favorite ? '#F3FF14' : '#777'}
            />
            <Text
              style={[styles.buttonText, this.state.favorite ? styles.checkedText : styles.uncheckedText]} 
            >
              Style  {this.state.favoriteQuantity}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, this.state.clothete ? styles.checkedButton : styles.uncheckedButton]}
          onPress={() => this.handleSubmit('clothete')}
          underlayColor="transparent"
        >
          <View>
            <Icon
              type="font-awesome"
              name={this.state.clothete ? 'plus-square' : 'plus-square-o'}
              size={22}
              color={this.state.clothete ? '#16DD6C' : '#777'}
            />
            <Text
              style={[styles.buttonText, this.state.clothete ? styles.checkedText : styles.uncheckedText]}
            >
              Closet {this.state.clotheteQuantity}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  LikeButtonArea: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-around',
  },
  button: {
    width: width / 3.4,
    height: width / 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0.2, height: 0.3 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  uncheckedButton: {
    backgroundColor: '#fff',
  },
  checkedButton: {
    // backgroundColor: 'rgba(240,240,240,0.2)',
    // backgroundColor: '#eee',
  },
  buttonText: {
    fontSize: 12,
  },
  uncheckedText: {
    color: '#222',
  },
  checkedText: {
    color: '#999',
  },
});

export default LikeButtons;
