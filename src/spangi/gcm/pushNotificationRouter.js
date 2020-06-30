'use strict';

var express = require('express');
var router = express.Router();
var sendPushNotification = require('./firebase');

//TODO
var push_token = '';

router.post('/', (req, res) => {
    var fcm_target_token = req.query.token;
    var device_id = req.query.deviceID;

    //TODO
    push_token = fcm_target_token;

    res.send('ok');
});

router.post('/send', (req, res) => {
    //TODO get data
    var fcm_target_token = push_token;
    var title = 'TEST'
    var body = 'just a test message'

    sendPushNotification(fcm_target_token, title, body);
    res.send('ok');
});

module.exports = router;
