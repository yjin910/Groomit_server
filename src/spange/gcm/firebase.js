var admin = require("firebase-admin");
var serviceAccount = require("../../../private/gpangi-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gpangi-test.firebaseio.com",
});


/**
 * The aim of this function is to send the push notification by using the firebase GCM
 * @param {*} token_raw 
 * @param {*} message_title 
 * @param {*} message_body 
 */
const sendPushNotification = (token_raw, message_title, message_body, latitude, longitude) => {
    var fcm_target_token = token_raw;
    console.log('sendPushNotification() is called', new Date())
    console.log(`fcm_target_token = ${fcm_target_token}`);
    
    if (typeof fcm_target_token != 'string') fcm_target_token = `${token_raw}`;

    var fcm_message = {
        data: {
            title: message_title,
            body: message_body,
            android_channel_id: 'spange_channel',
            latitude: `${latitude}`,
            longitude: `${longitude}`
        },
        android: {
            priority: 'high',
        },
        token: fcm_target_token
    }

    //TODO debugging
    console.log('fcm_message: ', fcm_message);

    admin.messaging().send(fcm_message)
        .then((res) => {
            console.log('message sending success: ', res);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = sendPushNotification;
