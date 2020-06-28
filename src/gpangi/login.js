'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    //TODO
    res.render('gpangiLogin.html');
});

module.exports = router;
