'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var username = req.cookies.username;

    if (username) {
        res.redirect('/main');
    } else {
        res.render('register.html');
    }
});

module.exports = router;
