'use strict';

var express = require('express');
var router = express.Router();
var dbConn = require('../dbConnection');

router.post('/', (req, res) => {
    var email = req.query.email;
    var password = req.query.password;

    dbConn.login_SPANGE(res, email, password);
});

router.post('/getDevice', (req, res) => {
    var username = req.query.username;
    dbConn.getDeviceID_SPANGE_LOGIN(res, username);
})

router.post('/getMemberKey', (req, res) => {
    var deviceID = req.query.deviceID;
    dbConn.getMemberKey_SPANGE_LOGIN(res, deviceID);
});

module.exports = router;
