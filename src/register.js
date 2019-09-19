'use strict';

var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', (req, res) => {
    res.render('register.html');
});

module.exports = router;
