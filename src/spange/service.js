'use strict';

var express = require('express');
var router = express.Router();
var dbConn = require('../dbConnection');

//-------------------------------------------------------------------------------------------------------------------------------------
// Endpoints for SPANGE android app

router.post('/acceptUser', (req, res) => dbConn.acceptUser_SPANGE(res, req.query.userID, req.query.deviceID));

router.post('/deleteUser', (req, res) => dbConn.deleteUserInfo_SPANGE(res, req.query.userID, req.query.deviceID));

router.post('/registerUser', (req, res) => dbConn.registerUser_SPANGE(res, req.query.userID, req.query.token));

router.post('/registerDevice', (req, res) => dbConn.registerDeviceID_SPANGE(res, req.query.userID, req.query.deviceID));

router.post('/users/registered', (req, res) => dbConn.getUsersByDeviceID_SPANGE(res, req.query.deviceID));

//-------------------------------------------------------------------------------------------------------------------------------------

router.post('/registerAdminUserForDevice', (req, res) => dbConn.registerAdminUserForDevice_SPANGE(res, req.query.userID, req.query.deviceID));

router.post('/registerNewDevice', (req, res) => dbConn.registerDevice_SPANGE(res, req.query.deviceID, req.query.member_key));

module.exports = router;
