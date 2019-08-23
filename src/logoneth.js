var express = require('express');
var dbcon = require('./dbConnection');
var router = express.Router();
// var fs = require("fs");
// var LOG_PATH = 'log'
var moment = require('moment');

router.get('/', (req, res) => {
    try{
        //get datas from req
        var device_uid = req.query.u;
        var t_value = req.query.t;
        var h_value =  req.query.h;
        var time_val = moment(new Date().toLocaleString('en-GB', { timeZone: 'Asia/Seoul', hour12: false }), 'MM/DD/YYYY, hh:mm:ss').format('YYYY-MM-DDTHH:mm:ssZ');
        var seq = req.query.s;

        dbcon.addData(device_uid, "t", t_value, time_val, res);
        dbcon.addData(device_uid, "h", h_value, time_val, res);

        console.log(s1);
        res.send(time_val);
    } catch (e){
        console.error('catch error: ', e.stack);
        res.status(404);
    }

});

module.exports = router;
