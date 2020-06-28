var admin = require("firebase-admin");
var serviceAccount = require("../../private/gpangi-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gpangi-test.firebaseio.com",
});


/**
 * The aim of this function is to send the push notification by using the firebase GCM
 * @param {*} token_str 
 * @param {*} message_title 
 * @param {*} message_body 
 */
const sendPushNotification = (token_str, message_title, message_body) => {
    var fcm_target_token = token_str;
    var fcm_message = {
        data: {
            title: message_title,
            body: message_body,
            android_channel_id: 'gpangi_channel'
        },
        android: {
            priority: 'high',
        },
        token: fcm_target_token
    }

    admin.messaging().send(fcm_message)
        .then((res) => {
            console.log('message sending success: ', res);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = sendPushNotification;
