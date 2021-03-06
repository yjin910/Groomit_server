'use strict';

var express = require('express');
var router = express.Router();
var dbConn = require('../dbConnection');

const API_CODE_SPACOSA_LOCATION = 'api.push.member.location';

const DEFAULT_LATITUDE = 0;
const DEFAULT_LONGITUDE = 0;


router.get('/', (req, res) => dbConn.getTokenByDeviceID_SPANGE(res, '61075', '37.401782989502', '126.7320098877') );

router.post('/', (req, res) => {
    var fcm_target_token = req.query.token;
    var device_id = req.query.deviceID;
    var user_id = 'app_test';

    console.log('Test - device_id', device_id);
    console.log('Test - push_token:', fcm_target_token);

    dbConn.registerUser_SPANGE(res, user_id, fcm_target_token);
});

router.post('/updateToken', (req, res) => dbConn.updateGCMToken_SPANGE(res, req.query.previousToken, req.query.newToken) );

//------------------------------------------------------------------------------------------------------------------------------------------------
// Endpoints for Spacosa notification

router.get('/send', (req, res) => {
    console.log('req.query', req.query);
    console.log('req.params', req.params);

    res.send('response!');
});

router.post('/send', (req, res) => {
    var {latitude, longitude} = req.body.data;
    var {api_code, partner_key, member_key, device_sn} = req.body.data;

    if (api_code != API_CODE_SPACOSA_LOCATION) {
        res.send('api_code mismatch!');
        return;
    }

    if (latitude == null) latitude = DEFAULT_LATITUDE;
    if (longitude == null) longitude = DEFAULT_LONGITUDE;

    dbConn.getTokenByDeviceID_SPANGE(res, device_sn, latitude, longitude);
});

//------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;
