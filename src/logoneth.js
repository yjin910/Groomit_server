var express = require('express');
var dbcon = require('./dbConnection');
var router = express.Router();
// var fs = require("fs");
// var LOG_PATH = 'log'
var moment = require('moment');

router.get('/', (req, res) => {
    try{
        var s1 = moment(new Date().toLocaleString('en-GB', { timeZone: 'Asia/Seoul', hour12: false }), 'DD/MM/YYYY, hh:mm:ss');
        var s2 = s1.format('YYYY-MM-DDTHH:mm:ssZ')

        //get datas from req
        var device_uid = req.query.u;
        var t_value = req.query.t;
        var h_value =  req.query.h;
        var time_val = s2;
        var seq = req.query.s;

        dbcon.addData(device_uid, "t", t_value, time_val);
        dbcon.addData(device_uid, "h", h_value, time_val);

        console.log(s1);
        res.send(time_val);
    } catch (e){
        console.error('catch error: ', e.stack);
        res.status(404);
    }

});

module.exports = router;
