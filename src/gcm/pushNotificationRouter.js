'use strict';

var express = require('express');
var router = express.Router();


router.post('/', (req, res) => {
    var fcm_target_token = req.query.token;
    var device_id = req.query.deviceID;

    res.send('ok');
});

router.post('/send', (req, res) => {
    //TODO get data
    var fcm_target_token = ''
    var title = 'TEST'
    var body = 'just a test message'

    sendPushNotification(fcm_target_token, title, body);
    res.send('ok');
});

module.exports = router;