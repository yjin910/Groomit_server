'use strict';

var express = require('express');
var router = express.Router();
var dbConn = require('../dbConnection');

router.post('/', (req, res) => {
    var {email, password, username} = req.query;
    dbConn.signup_SPANGE(res, email, password, username);
});

module.exports = router;