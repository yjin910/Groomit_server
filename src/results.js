'use strict';
var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');
var fs = require('fs');

router.get('/', (req, res) => {
    res.render('results.html');
});

router.get('/all_results', (req, res) => {
    console.log(req.query.start);
    dbcon.getData(res, req.query.u, req.query.start, req.query.end);
});


module.exports = router;
