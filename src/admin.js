'use strict';

var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', (req, res) => {
    var username = req.cookies.username;

    if (username) {
        res.render('admin.html');
    } else {
        res.redirect('/login');
    }
});

router.post('/', (req, res) => {
    dbcon.getUsersInfo();
});


module.exports = router;
