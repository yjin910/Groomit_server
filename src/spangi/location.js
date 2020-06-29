'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var username = req.cookies.username;

    if (username) {
        res.render('location.html');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
