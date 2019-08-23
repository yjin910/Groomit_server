var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');
var moment = require('moment');

router.get('/', (req, res) => {
    try{
        //get datas from req
        var device_uid = req.query.u;
        var g_value = req.query.g;
        var time_val = moment(new Date().toLocaleString('en-GB', { timeZone: 'Asia/Seoul', hour12: false }), 'MM/DD/YYYY, hh:mm:ss').format('YYYY-MM-DDTHH:mm:ssZ');
        var seq = req.query.s;

        if(g_value){
            dbcon.addData(device_uid, "g", g_value, time_val, res);
            res.send("success");
        }
    } catch (e){
        console.error('catch error: ', e.stack);
        res.status(404);
    }

});

module.exports = router;
