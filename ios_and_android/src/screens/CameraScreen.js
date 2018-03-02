// import React from 'react';
// import { StyleSheet, Button, Image, View } from 'react-native';
// // import { ImagePicker } from 'expo';

// class CameraScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: null,
//     };
//   }


//   _camera = async () => {
//     let result = await ImagePicker.launchCameraAsync();
//     console.log(result)
//     if (!result.cancelled) {
//       this.setState({ image: result.uri });
//     }
//   }

//   _pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: 'Images',
//       allowsEditing: true,
//       aspect: [3,4],
//     });

//     console.log(result);
//     if (!result.cancelled) {
//       this.setState({ image: result.uri })
//     }
//   }

//   render() {
//     let { image } = this.state;
//     return (
//       <View style={styles.container}>
//         <Button
//           title="Pick an image from camera roll"
//           onPress={this._pickImage}
//         />
//         <Button
//           title="Enjoy Camera!"
//           onPress={this._camera}
//         />
//         {image &&
//           <Image source={{ uri: image }} style={styles.image} />}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   constainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
// });

// export default CameraScreen;



