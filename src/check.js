'use strict';

var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');
var fs = require("fs");

router.get('/', (req, res) => {
    var username = req.cookies.username;
  
    console.log()
    dbcon.isAdmin(res, username);
});

module.exports = router;
