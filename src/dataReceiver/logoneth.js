var express = require('express');
var dbcon = require('../dbConnection');
var router = express.Router();
var moment = require('moment');

router.get('/', (req, res) => {
    try {
        // server: 'MM/DD/YYYY, hh:mm:ss', local: 'DD/MM/YYYY, hh:mm:ss'
        // If not, moment.invalid error would be occurred
        var s1 = moment(new Date().toLocaleString('en-GB', { timeZone: 'Asia/Seoul', hour12: false }), 'MM/DD/YYYY, hh:mm:ss');
        var s2 = s1.format('YYYY-MM-DDTHH:mm:ssZ')

        //get datas from req
        var device_uid = req.query.u;
        var t_value = req.query.t;
        var h_value =  req.query.h;
        var time_val = s2;
        var seq = req.query.s;

        if(t_value && h_value){
            dbcon.updateData(device_uid, "t", t_value, time_val);
            dbcon.updateData(device_uid, "h", h_value, time_val);
            res.send("success");
        }else {
            res.send('Please provide suitable parameters');
        }
    } catch (e){
        console.error('catch error: ', e.stack);
        res.status(404);
    }

});

module.exports = router;
