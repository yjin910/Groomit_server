'use strict';
var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');
var fs = require('fs');

router.get('/', (req, res) => {
    res.render('main.html');
});

router.get('/graphInfo', (req, res) => {
    dbcon.getData(res, req.query.u, req.query.type, req.query.startD, req.query.endD);
});

router.get('/mainUuid', (req, res) => {
    dbcon.getUuid(res, req.query.email);
});

router.get('/dateLimit', (req, res) => {
    dbcon.getDateLimit(res, req.query.u);
});

router.get('/representative', (req, res) => {
    dbcon.getDataOfRepresentiveDevice(res, req.query.email);
});

module.exports = router;