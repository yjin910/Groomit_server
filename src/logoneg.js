var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');
var moment = require('moment');

router.get('/', (req, res) => {
    try{
        var s1 = moment(new Date().toLocaleString('en-GB', { timeZone: 'Asia/Seoul', hour12: false }), 'MM/DD/YYYY, hh:mm:ss');
        var s2 = s1.format('YYYY-MM-DDTHH:mm:ssZ')

        //get datas from req
        var device_uid = req.query.u;
        var g_value = req.query.g;
        var time_val = s2;
        var seq = req.query.s;

        if(g_value){
            dbcon.addData(device_uid, "g", g_value, time_val);
            res.send("success");
        }
    } catch (e){
        console.error('catch error: ', e.stack);
        res.status(404);
    }

});

module.exports = router;
