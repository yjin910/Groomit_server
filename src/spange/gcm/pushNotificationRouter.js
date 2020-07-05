'use strict';

var express = require('express');
var router = express.Router();
var dbConn = require('../../dbConnection');

var sendPushNotification = require('./firebase');

//TODO
var push_token = '';

router.get('/', (req, res) => {
    //TODO get data
    var fcm_target_token = push_token;
    var title = 'TEST'
    var body = 'just a test message'

    //TODO location data
    var latitude = '37.401782989502';
    var longitude = '126.7320098877';

    sendPushNotification(fcm_target_token, title, body, latitude, longitude);
    res.send('ok');
});

router.post('/', (req, res) => {
    var fcm_target_token = req.query.token;
    var device_id = req.query.deviceID;

    //TODO user_id, device_id
    push_token = fcm_target_token;
    //dbConn.registerDevice_SPANGE(res, user_id, device_id);

    res.send('ok');
});

router.post('/send', (req, res) => {
    //TODO get data
    var fcm_target_token = push_token;
    var title = 'TEST'
    var body = 'just a test message'

    //TODO location data
    var latitude = req.body.data.latitude;
    var longitude = req.body.data.longitude;

    sendPushNotification(fcm_target_token, title, body, latitude, longitude);
    res.send('ok');
});

module.exports = router;
