'use strict';

const mysql = require('mysql');

/**
 * This variable creates the connection pool to control the database connections.
 *
 * @type {Pool} the connection pool.
 */
var pool = mysql.createPool({
    host: 'groomdb57ywyj.c2rirrernrhc.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'sung0429',
    database: 'groomdata',
    connectionLimit : 100
});

exports.addOwner = function(email, deviceNum) {
    var queryString ="INSERT INTO device_owner (email, deviceNum) VALUES(?, ?)";
    var params = [email, deviceNum];

    pool.getConnection(function(err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, params, function(err, result, fields) {
                if (err) {
                    res.send(err);
                } else {
                    console.log("Successfully added new owner");
                }
            });

            conn.release();
        }
    });
}

exports.addData = function(deviceNum, type, value, time, res) {
    var queryString ="INSERT INTO measurement (deviceNum, type, val, time) VALUES(?, ?, ?, ?)";
    var params = [deviceNum, type, value, time];

    pool.getConnection(function(err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, params, function(err, result, fields) {
                if (err) {
                    res.send(err);
                } else {
                    console.log("Successfully added new data");
                }
            });

            conn.release();
        }
    });
}

exports.sendGraphPage = (res, deviceNum, type) => {
    var queryString = `SELECT * from measurement WHERE deviceNum = "${deviceNum}" AND time > DATE_SUB(NOW(), INTERVAL 14 HOUR)`;
    // TODO select * from measurement where deviceNum = 18 and time >= '2019-08-23 01:00:00';
    // var params = [deviceNum, type, value, time];

    if (type) {
        if (type.length == 2) {
            if (!type.includes('t')) {
                queryString += ` AND type != 't'`
            } else if (!type.includes('h')) {
                queryString += ` AND type != 'h'`
            } else if (!type.includes('g')) {
                queryString += ` AND type != 'g'`
            }
        } else if (type.length == 1) {
            switch (type) {
                case 't' :
                    queryString += ` AND type = 't'`
                    break;
                case 'h' :
                    queryString += ` AND type = 'h'`
                    break;
                case 'g' :
                    queryString += ` AND type = 'g'`
                    break;
                default :
                    console.log('Invalid type: ', type);
            }
        }
    }

    pool.getConnection(function(err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, function(err, results, fields) {
                if (err) {
                    res.send(err);
                } else {
                    res.render('graph.html', {c: type, projects: results}); // (3)
                }
            });

            conn.release();
        }
    });
}

exports.getData = (res, deviceNum, type) => {
    var queryString = `SELECT * from measurement WHERE deviceNum = "${deviceNum}" AND time > DATE_SUB(NOW(), INTERVAL 14 HOUR)`;
    // var params = [deviceNum, type, value, time];

    if (type) {
        if (type.length == 2) {
            if (!type.includes('t')) {
                queryString += ` AND type != 't'`
            } else if (!type.includes('h')) {
                queryString += ` AND type != 'h'`
            } else if (!type.includes('g')) {
                queryString += ` AND type != 'g'`
            }
        } else if (type.length == 1) {
            switch (type) {
                case 't':
                    queryString += ` AND type = 't'`
                    break;
                case 'h':
                    queryString += ` AND type = 'h'`
                    break;
                case 'g':
                    queryString += ` AND type = 'g'`
                    break;
                default:
                    console.log('Invalid type: ', type);
            }
        }
    }

    pool.getConnection(function (err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, function (err, results, fields) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(results);
                }
            });

            conn.release();
        }
    });
}

exports.addDevice = function(email, deviceNum) {
    var queryString ="INSERT INTO device_owner (deviceNum, email) VALUES(?, ?)";
    var params = [deviceNum, email];

    pool.getConnection(function(err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, params, function(err, result, fields) {
                if (err) {
                    res.send(err);
                } else {
                    console.log("Successfully added new device");
                }
            });

            conn.release();
        }
    });
}

exports.getUuid = function(res, email) {
    var queryString =`SELECT * from device_owner WHERE email = "${email}"`;

    pool.getConnection(function(err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, function(err, result, fields) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result)
                    console.log("Successfully send device info");
                }
            });

            conn.release();
        }
    });
}