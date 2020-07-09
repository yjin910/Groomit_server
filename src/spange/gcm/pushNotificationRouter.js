'use strict';

var express = require('express');
var router = express.Router();
var dbConn = require('../../dbConnection');

const API_CODE_SPACOSA_LOCATION = 'api.push.member.location';


router.get('/', (req, res) => {
    //TODO location data
    var latitude = '37.401782989502';
    var longitude = '126.7320098877';

    //sendPushNotification(fcm_target_token, title, body, latitude, longitude);
    dbConn.getTokenByDeviceID_SPANGE(res, 'test_device', latitude, longitude);
});

router.post('/', (req, res) => {
    var fcm_target_token = req.query.token;
    var device_id = req.query.deviceID;
    var user_id = 'app_test';

    console.log('Test - device_id', device_id);
    console.log('Test - push_token:', fcm_target_token);

    dbConn.registerUser_SPANGE(res, user_id, fcm_target_token);
    res.send('ok');
});

router.post('/updateToken', (req, res) => {
    var previous_token = req.query.previousToken;
    var new_token = req.query.newToken;

    dbConn.updateGCMToken_SPANGE(res, previous_token, new_token);
});

router.post('/registerDevice', (req, res) => {
    var device_id = req.query.deviceID;
    var user_id = req.query.userID;

    dbConn.registerDevice_SPANGE(res, user_id, device_id);
});

router.post('/registerUser', (req, res) => {
    var user_id = req.query.userID;
    var token = req.query.token;

    dbConn.registerUser_SPANGE(res, user_id, token);
});

router.get('/send', (req, res) => {
    console.log('req.query', req.query);
    console.log('req.params', req.params);

    res.send('response!');
});

router.post('/send', (req, res) => {
    var {latitude, longitude} = req.body.data;
    var {api_code, partner_key, member_key, device_sn} = req.body.data;

    if (api_code != API_CODE_SPACOSA_LOCATION) res.send('api_code mismatch!');

    //TODO
    if (latitude == null) latitude = 0;
    if (longitude == null) longitude = 0;

    dbConn.getTokenByDeviceID_SPANGE(res, device_sn, latitude, longitude);
});

module.exports = router;
