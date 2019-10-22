'use strict';
var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');
var fs = require('fs');

router.get('/', (req, res) => {
    var username = req.cookies.username;

    if (username) {
        res.render('main.html');
    } else {
        res.redirect('/login');
    }
});

router.get('/graphInfo', (req, res) => {
    dbcon.getData(res, req.query.u, req.query.type, req.query.term);
});

router.get('/mainUuid', (req, res) => {
    dbcon.getUserProfile(res, req.query.email);
});

router.post('/dateLimit', (req, res) => {
    dbcon.getDateLimit(res, req.query.u, req.query.term);
});

router.get('/representative', (req, res) => {
    if (req.query.term) {
        dbcon.getDataOfRepresentiveDevice(res, req.query.email, req.query.term);
    } else {
        dbcon.getDataOfRepresentiveDevice(res, req.query.email, undefined);
    }
});

module.exports = router;