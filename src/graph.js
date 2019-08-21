'use strict';

var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');
var fs = require('fs');

router.get('/', (req, res) => {
  dbcon.sendGraphPage(res, req.query.u, req.query.c);
  console.log("Successfully sent data");
});

module.exports = router;

router.get('/data', (req, res) => {
  console.log(req.query)
  var rawdata = fs.readFileSync(__dirname + '/../log/' + req.query.u);
  var jsonData = JSON.parse(rawdata);
  var strJsonData = JSON.stringify(jsonData);
  res.send(strJsonData);
});

module.exports = router;
