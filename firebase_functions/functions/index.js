// ChatAppFirebaseFunctions/functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.firestore
  .document('users/{token}/visitor/{timestamp}')
  .onCreate(event => {
    const newValue = event.data.data();
    const payload = {
      notification: {
        title: 'Welcome!',
        body: 'Geek Shop 表参道に入店しました!',
      },
  };
  const token = newValue.userToken;
  return admin.messaging().sendToDevice(token, payload)
  .then((response) => {
    console.log("Successfully sent message:", response);
    return;
  })
});
