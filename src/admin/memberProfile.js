'use strict';

var express = require('express');
var router = express.Router();
var dbcon = require('../dbConnection');

router.get('/', (req, res) => {
    console.log(req.query.email);
    // var username = req.cookies.username;

    // if (username) {
    //     res.render('memberList.html');
    // } else {
    //     res.redirect('/login');
    // }
    res.render("memberProfile.html");
});

// router.post('/getUsers', (req, res) => {
//     dbcon.getUsersInfo(res);
// });


module.exports = router;
