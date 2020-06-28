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
