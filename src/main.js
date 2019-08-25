'use strict';

var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');
var fs = require('fs');

router.get('/', (req, res) => {
    res.render('main.html');
});

router.get('/:mainUuid', (req, res) => {
    dbcon.getUuid(res, req.query.email);
});

router.post('/:graphInfo', (req, res) => {
    dbcon.getData(res, req.query.u, req.query.type);
});

module.exports = router;
