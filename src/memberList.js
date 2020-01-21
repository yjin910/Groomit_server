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

// router.get('/ownProfile', (req, res) =>{
//     console.log(req.query.email);
//     res.redirect('/memberProfile?email=' + req.query.email);
//     // res.render('memberProfile.html');    
//     // console.log("\nTRUE\n");
// })


module.exports = router;
