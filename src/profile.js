'use strict';
var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');

router.get('/', (req, res) => {
  res.render('profile.html');
});

router.post('/userInfo', (req, res) => {
//   console.log(req.query);  
  dbcon.addDevice(req.query.email, req.query.u);
  res.send("hi");
});

router.post('/delUser', (req, res) => {
  //   console.log(req.query);
  console.log("here");
  dbcon.delUser(res, req.query.email);
  res.send("hi");
});

module.exports = router;
