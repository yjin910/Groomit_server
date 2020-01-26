'use strict';

var express = require('express');
var router = express.Router();
var dbcon = require('./dbConnection');

router.get('/', (req, res) => {
    var username = req.cookies.username;

    if (username) {
        res.render('memberList.html');
    } else {
        res.redirect('/login');
    }
});

router.post('/getUsers', (req, res) => {
    dbcon.getUsersInfo(res);
});

router.post('/getDevices', (req, res) => {
    dbcon.getDevices(res);
})

router.post('/addRelation', (req, res) => {
    var u = req.query.u;
    var email = req.query.email;

    dbcon.addOwner(email, u);
})

router.post('/addDevice', (req, res) => {
    var u = req.query.u;
    var type = req.query.type;

    dbcon.addDeviceType(res, u, type);
})

router.post('/deleteDevice', (req, res) => {
    var u = req.query.u;

    dbcon.deleteDeviceType(res, u);
    dbcon.deleteDevice(res, u);
    dbcon.deleteMeasurement(res, u);
    dbcon.deleteRecentValue(res, u);
})

// router.get('/ownProfile', (req, res) =>{
//     console.log(req.query.email);
//     res.redirect('/memberProfile?email=' + req.query.email);
//     // res.render('memberProfile.html');    
//     // console.log("\nTRUE\n");
// })


module.exports = router;
