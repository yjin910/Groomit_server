'use strict';

var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', (req, res) => {
  res.render('login.html'); // (3)
});

router.post('/', (req, res) => {
  var username = req.query.username;
  res.cookie('username', username, {
    maxAge: 86400000 //maxAge = 24hours
  });

  res.send('ok');
});


module.exports = router;
