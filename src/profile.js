'use strict';

var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');
var fs = require('fs');

router.get('/', (req, res) => {
    res.render('profile.html');
});

router.post('/:userInfo', (req, res) => {
//   console.log(req.query);
  dbcon.addDevice(req.query.email, req.query.u);
  res.send("hi");
});

module.exports = router;
