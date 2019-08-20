'use strict';

const mysql = require('mysql');

/**
 * This variable creates the connection pool to control the database connections.
 *
 * @type {Pool} the connection pool.
 */
let pool = mysql.createPool({
    host: 'groomdb57ywyj.c2rirrernrhc.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'sung0429',
    database: 'groomdata',
    connectionLimit : 100
});

// pool.connect(function(err) {
//     if (err) {
//         console.error('mysql connection error');
//         console.error(err);
//         throw err;
//     }else{ 
//         console.log("연결에 성공하였습니다."); 
//     } 
// });

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

exports.addData = function(deviceNum, type, value, time) {
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

exports.getData =  function(graphres, deviceNum, type) {
    var queryString =`SELECT * from measurement WHERE deviceNum = "${deviceNum}"`;
    // var params = [deviceNum, type, value, time];

    pool.getConnection(function(err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, function(err, results, fields) {
                if (err) {
                    res.send(err);
                } else {
                    graphres.render('graph.html', {c: type, projects: results}); // (3)
                }
            });

            conn.release();
        }
    });
}