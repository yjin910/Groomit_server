'use strict';

var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', (req, res) => {

    res.render('temp.html'); // (3)

});


module.exports = router;
