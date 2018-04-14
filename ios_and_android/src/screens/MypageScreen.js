import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight, ActivityIndicator } from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import firebase from 'firebase';

import ShopStaff from '../components/ShopStaff';
import UserLibraryImages from '../components/UserLibraryImages';
import Sidebar from '../components/Sidebar';

const Dimensions = require('Dimensions');

const { width, height } = Dimensions.get('window');

const userImagePadding = 25;
if (height === 812) {
  userImagePadding = 40
}

class MypageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topComponentHeight: 0,
      allDataList: [],
      dataList: [],
      userData: [],
      userId: '',
      shop: false,
      shopStaff: [],
      loading: true,
      selectedIndex: 0,
      sideMenuOpen: false,
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.filterDataList = this.filterDataList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLayout = this.onLayout.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Mypage',
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 10,
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color:'transparent',
    },
    headerBackTitleStyle: {
      fontSize: 15,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 3,
    },
    headerRight: (
      <Icon
        name="settings"
        iconStyle={{ 
          marginRight: 10,
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: {width: 1, height: 1},
          textShadowRadius: 3,
        }}
        color='#fff'
        onPress={() => navigation.state.params.openSideMenu()}
        underlayColor="transparent" />
      ),
  });

  componentWillMount() {
    this.props.navigation.setParams({ openSideMenu: this.openSideMenu.bind(this) });
    const { currentUser } = firebase.auth();
    const userId = this.props.navigation.state.params ? this.props.navigation.state.params.user : currentUser.uid;
    const db = firebase.firestore();
    db.collection('users').doc(userId)
      .onSnapshot((querySnapshot)=> {
        querySnapshot.data().type === 'shop' ?
        this.setState({
          userData: querySnapshot.data(),
          userId,
          shop: true,
        }) :
        this.setState({
          userData: querySnapshot.data(),
          userId,
        });
      });
  }

  componentWillReceiveProps() {
    let dataList = [];
    const db = firebase.firestore();
    if (this.state.shop) {
      const shopStaff = [];
      db.collection('collections')
        .where('user', '==', this.state.userId)
        .get()
        .then((__querySnapshot) => {
          __querySnapshot.forEach((_doc) => {
            dataList.push(_doc.data());
          })
        db.collection('users')
            .where('shopId', '==', this.state.userId)
            .get()
            .then((___querySnapshot) => {
              ___querySnapshot.forEach((_doc) => {
                shopStaff.push({ ..._doc.data(), key: _doc.id });
              })
            })
          this.setState({ 
            dataList,
            shopStaff,
            loading: false,
          });
          return;
        })
    } else {
      let userId = this.state.userId;
      if (userId === '') {
        const { currentUser } = firebase.auth();
        userId = currentUser.uid
      }
      db.collection(`users/${userId}/status`).orderBy('createdOnNumber', 'desc')
        .onSnapshot((querySnapshot) => {
          const allDataList = [];
          dataList = [];
          if(querySnapshot.docs.length === 0) {
            this.setState({
              allDataList,
              dataList,
              loading: false,
            });
            return;
          }
          querySnapshot.forEach((doc) => {
            db.collection('collections').doc(doc.id)
              .get()
              .then((_querySnapshot) => {
                const combineData = Object.assign(doc.data(), _querySnapshot.data());
                allDataList.push(combineData);
                if (combineData.want) {
                  dataList.push(combineData);
                }
                this.setState({
                  allDataList,
                  dataList,
                  loading: false,
                });
              })
          });
        });
    }
  }

  handleSubmit() {
    this.setState({ sideMenuOpen: false });
  }

  openSideMenu() {
      this.setState({ sideMenuOpen: !this.state.sideMenuOpen });
  }

  filterDataList(selectStatus, selectedIndex) {
    const allDataList = this.state.allDataList;
    const dataList = [];
    for (let i = 0, len = allDataList.length; len > i; i += 1) {
      if (allDataList[i][selectStatus]) {
        dataList.push(allDataList[i]);
      }
    }
    this.setState({ dataList, selectedIndex});
  }

  updateIndex(selectedIndex) {
    if (selectedIndex === 0) {
      this.filterDataList('want', selectedIndex);
    } else if (selectedIndex === 1) {
      this.filterDataList('favorite', selectedIndex);
    } else {
      this.filterDataList('clothete', selectedIndex);
    }
  }

  _updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  onLayout = (e) => {
    this.setState({
      topComponentHeight: e.nativeEvent.layout.height
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#777" />
        </View>
      );
    }
    const buttons = ['Want', 'Style', 'Closet'];
    const shopButtons = ['Post', 'Staffs'];
    const { selectedIndex, shop } = this.state;
    const userContents = shop && selectedIndex === 0 || !shop ? (
      <UserLibraryImages
        navigation={this.props.navigation}
        dataList={this.state.dataList}
        selectedIndex={this.state.selectedIndex}
        topComponentHeight={this.state.topComponentHeight}
      />) : (
        <ShopStaff
          userData={this.state.userData}
          userId={this.state.userId}
          shopStaffList={this.state.shopStaff}
          navigation={this.props.navigation}
          topComponentHeight={this.state.topComponentHeight}
        />
      );
    const menu = (
    <Sidebar
      userData={this.state.userData}
      userId={this.state.userId}
      navigation={this.props.navigation}
      handleSubmit={this.handleSubmit}
    />
    );
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.sideMenuOpen}
        edgeHitWidth={0}
        menuPosition="right"
        onChange={(e) => this.setState({ sideMenuOpen: e })}
      >
        <View
          style={styles.container}
        >
          <View
            onLayout={this.onLayout}
          >
            <ImageBackground
              source={{ uri: this.state.userData.backgroundImage }}
              style={styles.main}
            >
            <View style={styles.overlay} />
              <Image
                source={{ uri: this.state.userData.userImage }}
                style={styles.userImage}
              />
              <Text
                style={styles.userName}
                numberOfLines={1}
                ellipsizeMode={'tail'}
              >{this.state.userData.userName}</Text>
              {
                this.state.userData.type === 'shopStaff' && (
                  <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('MypageScreen', { user: this.state.userData.shopId })}
                    underlayColor="transparent"
                  >
                    <Text
                      style={styles.shopName}
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      >
                      {this.state.userData.shopName} STAFF
                    </Text>
                  </TouchableHighlight>
                )
              }
              <Text
                style={styles.userDescription}
                numberOfLines={5}
                ellipsizeMode={'tail'}
              >{this.state.userData.userText}</Text>
              <View style={styles.statusButtonArea}>
              {
                this.state.shop ? (
                  <ButtonGroup
                    onPress={(selectedIndex) => this.setState({ selectedIndex })}
                    selectedIndex={selectedIndex}
                    buttons={shopButtons}
                    buttonStyle={styles.statusButton}
                    textStyle={styles.statusButtonText}                
                    selectedButtonStyle={styles.selectStatusButtons}
                    containerStyle={styles.statusButtons}
                    selectedTextStyle={{ color: '#333' }}
                    underlayColor="transparent"
                  />
                ) :
                (
                  <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  buttonStyle={styles.statusButton}
                  textStyle={styles.statusButtonText}                
                  selectedButtonStyle={styles.selectStatusButtons}
                  containerStyle={styles.statusButtons}
                  selectedTextStyle={{ color: '#333' }}
                  underlayColor="transparent"
                />
                )
              }
              </View>
            </ImageBackground>
          </View>
          <View>
            { userContents }
          </View>
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  main: {
    alignItems: 'center',
    paddingTop: userImagePadding,
    paddingBottom: 10,
    maxHeight: 300,
  },
  settingIcon: {
    fontSize: 25,
    color: '#fff',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  shopName: {
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  userDescription: {
    color: '#fff',
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  statusButtonArea: {
    flexDirection: 'row',
    marginTop: 20,
  },
  statusButtons: {
    backgroundColor: 'rgba(200,200,200,0.8)',
    height: 32,
    width: width / 1.05,
    borderWidth: 0,
  },
  selectStatusButtons: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  statusButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.15)'
  }
});

export default MypageScreen;
