'use strict';
var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');

router.get('/', (req, res) => {
  var username = req.cookies.username;

  if (username) {
    res.render('profile.html');
  } else {
    res.redirect('/login');
  }
});

router.post('/checkDevice', (req, res) => {
  //   console.log(req.query);  
    dbcon.checkDevice(res, req.query.email, req.query.u);
  });

router.post('/addDevice', (req, res) => {
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
