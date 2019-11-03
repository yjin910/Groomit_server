'use strict';

var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');

router.get('/', (req, res) => {
    var username = req.cookies.username;

    if (username) {
        res.render('admin.html');
    } else {
        res.redirect('/login');
    }
});

router.post('/getUsers', (req, res) => {
    dbcon.getUsersInfo(res);
});


module.exports = router;
