var express = require('express');
var router = express.Router();

var moment = require('moment');

router.get('/', (req, res) => {
    /*
     * Send the current date time.
     *
     * Datetime format : YYYY-MM-DD hh:mm:ss
     */
    res.send(moment().format('YYYY-MM-DD hh:mm:ss'));
});

module.exports = router;
