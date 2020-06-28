'use strict';

var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');


router.get('/', (req, res) => {
    try {
        var device_cat = req.query.c;  // device category
        var device_uid = req.query.u;  // device uuid

        dbcon.getData(res, device_uid, device_cat);
    } catch (e) {
        console.error('catch error: ', e.stack);
        res.status(404);
    }

});

module.exports = router;