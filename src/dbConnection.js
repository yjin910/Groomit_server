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
    connectionLimit: 100
});

exports.addOwner = function(email, deviceNum) {
    var queryString = "INSERT INTO device_owner (email, deviceNum) VALUES(?, ?)";
    var params = [email, deviceNum];

    var success_msg = "Successfully added new owner";
    executeQuery_withParams_NoRespond(params, queryString, success_msg);
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
            } else if (!type.includes('c')) {
                queryString += ` AND type != 'c'`
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
                case 'c':
                    queryString += ` AND type = 'c'`
                    break;
                default:
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
                    res.render('graph.html', { c: type, projects: results }); // (3)
                }
            });

            conn.release();
        }
    });
}

exports.getData = (res, deviceNum, type, start, end) => {
    var queryString;

    if (start && end) {
        queryString = `SELECT * from measurement WHERE deviceNum = "${deviceNum}" AND time BETWEEN "${start}" AND "${end}"`;
    } else {
        queryString = `SELECT * from measurement WHERE deviceNum = "${deviceNum}" AND time > DATE_SUB(NOW(), INTERVAL 14 HOUR)`;
    }

    // var params = [deviceNum, type, value, time];
    console.log(queryString);
    if (type) {
        if (type.length == 2) {
            if (!type.includes('t')) {
                queryString += ` AND type != 't'`
            } else if (!type.includes('h')) {
                queryString += ` AND type != 'h'`
            } else if (!type.includes('g')) {
                queryString += ` AND type != 'g'`
            }else if (!type.includes('c')) {
                queryString += ` AND type != 'c'`
            }
        } else if (type.length == 1) {
            switch (type) {
                case 't':
                    queryString += ` AND type = 't'`
                    break;
                case 'c':
                    queryString += ` AND type = 'c'`
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

    executeQuery(res, queryString);
}

exports.updateData = function(res, deviceNum, type, value, time) {
    var queryString = "";
    var success_msg = "Successfully added new data"

    switch (type) {
        case 'g':
            queryString = `call insertGeiger('${deviceNum}', '${type}', ${value}, '${time}')`
            break;
        case 'c':
            queryString = `call insertCO2('${deviceNum}', '${type}', ${value}, '${time}')`
            break;
        case 't':
            queryString = `call insertTemperature('${deviceNum}', '${type}', ${value}, '${time}')`
            break;
        case 'h':
            queryString = `call insertHumidity('${deviceNum}', '${type}', ${value}, '${time}')`
            break;
        default:
            queryString = null
    }

    if (queryString) executeQuery_noRespond(res, queryString, success_msg);
}

exports.checkDevice = function(res, email, deviceNum) {
    var queryString = `SELECT * FROM device_owner WHERE email = "${email}" AND deviceNum = '${deviceNum}'`;

    executeQuery(res, queryString);
}

exports.addDevice = function(email, deviceNum) {
    var queryString = "INSERT INTO device_owner (deviceNum, email) VALUES(?, ?)";
    var params = [deviceNum, email];
    var success_msg = "Successfully added new device";

    executeQuery_withParams_NoRespond(params, queryString, success_msg);
}

exports.getUserProfile = (res, email) => {
    var querString = `SELECT device_owner.email, device_owner.deviceNum, recent_value.geiger, recent_value.temperature, recent_value.humidity FROM device_owner JOIN recent_value ON device_owner.deviceNum = recent_value.deviceNum WHERE device_owner.email = '${email}'`;
    executeQuery(res, querString);
}

exports.getUsersInfo = function(res){
    var querString = `SELECT DISTINCT email FROM device_owner`;
    executeQuery(res, querString);
}

//TODO: 각 테이블에 유저 정보 다 없애기
exports.delUser = function(res, email){
    var uuidQueryString = `SELECT * from device_owner WHERE email = "${email}"`;
    var devices = [];

    pool.getConnection(function (err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(uuidQueryString, function (err, result, fields) {
                if (err) {
                    res.send(err);
                } else {
                    if(result.length != 0){
                        for (let key in result){
                            devices.push(result[key].deviceNum);
                        }
                        console.log(devices)
                    }
                }
            });
            conn.release();
        }
    });
}

exports.getDateLimit = function(res, uuid, start, end) {
    var queryString;
    if (start && end) {
        queryString = `SELECT MIN(time) as mintime, MAX(time) as maxtime FROM measurement WHERE deviceNum = "${uuid}" AND time BETWEEN "${start}" AND "${end}"`;
    }else {
        queryString = `SELECT MIN(time) as mintime, MAX(time) as maxtime FROM measurement WHERE deviceNum = "${uuid}" and time > DATE_SUB(NOW(), INTERVAL 14 HOUR);`;
    }
    executeQuery(res, queryString);
}

exports.getDataOfRepresentiveDevice = (res, email, start, end) => {
    var queryString;

    if (start && end) {
        queryString = `SELECT * from measurement WHERE deviceNum = (select deviceNum from device_owner where email = '${email}' limit 1) and time BETWEEN "${start}" AND "${end}"`;
    } else {
        queryString = `select * from measurement where deviceNum = (select deviceNum from device_owner where email = '${email}' limit 1) and time > DATE_SUB(NOW(), INTERVAL 14 HOUR);`;
    }

    executeQuery(res, queryString);
}


var executeQuery = (res, queryString) => {
    pool.getConnection(function (err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(result);
                }
            });

            conn.release();
        }
    });
}

var executeQuery_noRespond = (res, queryString, success_msg) => {
    pool.getConnection(function (err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    res.send('error');
                } else {
                    console.log(success_msg);
                }
            });

            conn.release();
        }
    });
}

var executeQuery_withParams_NoRespond = (params, queryString, success_msg) => {
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
        } else {
            if(params){
                conn.query(queryString, params, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(success_msg);
                    }
                });
            }else{
                conn.query(queryString, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(success_msg);
                    }
                });
            }
            conn.release();
        }
    });
}