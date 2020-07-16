'use strict';

const mysql = require('mysql');
const sendPushNotification = require('./spange/gcm/firebase');

/**
 * This variable creates the connection pool to control the database connections.
 *
 * @type {Pool} the connection pool.
 */
var pool = mysql.createPool(require('../private/mysql_info.json'));


exports.isAdmin = function(res, username){
    var queryString = `SELECT * FROM admin WHERE email = '${username}'`;

    pool.getConnection(function (err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    res.send(err);
                } else {
                    if(result.length == 0){
                        res.redirect('/main');
                    }else{
                        res.redirect('/memberList');
                    }
                }
            });

            conn.release();
        }
    });
}

exports.addOwner = function(email, deviceNum) {
    var queryString = "INSERT INTO device_owner (email, deviceNum) VALUES(?, ?)";
    var params = [email, deviceNum];

    var success_msg = "Successfully added new owner";
    executeQuery_withParams_noResponse(params, queryString, success_msg);
}

exports.deleteOwner = function(email, deviceNum) {
    var queryString = `call deleteDeviceFromOwner('${email}', '${deviceNum}')`;
    var success_msg = "Successfully deleted the owner";

    executeQuery_noResponse(queryString, success_msg);
}

exports.sendGraphPage = (res, deviceNum, type) => {
    var queryString = `SELECT * from measurement WHERE deviceNum = "${deviceNum}" AND time > DATE_SUB(NOW(), INTERVAL 14 HOUR)`;

    if (type) {
        if (type.length > 1) {
            if (!type.includes('t')) queryString += ` AND type != 't'`
            if (!type.includes('h')) queryString += ` AND type != 'h'`
            if (!type.includes('g')) queryString += ` AND type != 'g'`
            if (!type.includes('c')) queryString += ` AND type != 'c'`

        } else if (type.length == 1) {
            // The main reason that I did not use break for each case is becasue that all valid cases do same thing
            switch (type) {
                case 't':
                case 'h':
                case 'g':
                case 'c':
                    queryString += ` AND type = '${type}'`
                    break;
                default:
                    console.log('Invalid type: ', type);
            }
        }
    } else {
        res.send('Invalid category! Please recheck the category!');
        return;
    }

    console.log(queryString);

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

exports.getData = (res, deviceNum, start, end) => {
    var queryString;

    if (start && end) {
        queryString = `SELECT * from measurement NATURAL JOIN device_sensors WHERE deviceNum = "${deviceNum}" AND time BETWEEN "${start}" AND "${end}"`;
    } else {
        queryString = `SELECT * from measurement NATURAL JOIN device_sensors WHERE deviceNum = "${deviceNum}" AND time > DATE_SUB(NOW(), INTERVAL 14 HOUR)`;
    }

    executeQuery(res, queryString);
}


exports.updateData = function(deviceNum, type, value, time) {
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

    if (queryString) executeQuery_noResponse(queryString, success_msg);
}

exports.getDeviceType = function(res, uuid){
    var queryString = `SELECT * FROM device_sensors WHERE deviceNum = "${uuid}"`;
    executeQuery(res, queryString);
}

exports.checkDevice = function(res, email, deviceNum) {
    var queryString = `SELECT * FROM device_owner WHERE email = "${email}" AND deviceNum = '${deviceNum}'`;

    executeQuery(res, queryString);
}

exports.addDevice = function(email, deviceNum) {
    var queryString = "INSERT INTO device_owner (deviceNum, email) VALUES(?, ?)";
    var params = [deviceNum, email];
    var success_msg = "Successfully added new device";

    executeQuery_withParams_noResponse(params, queryString, success_msg);
}

exports.addDeviceType = function(deviceNum, type){
    var queryString = `INSERT INTO device_sensors (deviceNum, sensors) VALUES ("${deviceNum}", "${type}")`;
    var success_msg = "Successfully added new device's device type";
    
    executeQuery_noResponse(queryString, success_msg);
}

exports.deleteDeviceRelation = function(deviceNum){
    var querString = `call deleteDeviceOwner('${deviceNum}')`;
    var success_msg = "Successfully deleted the device";
    
    executeQuery_noResponse(querString, success_msg);
}

exports.deleteDeviceType = function(deviceNum){
    var querString = `call deleteDeviceSensors('${deviceNum}')`
    var success_msg = "Successfully deleted device's device type";
    
    executeQuery_noResponse(querString, success_msg);
}

exports.getUserProfile = (res, email) => {
    // var querString = `SELECT device_owner.email, device_owner.deviceNum, recent_value.geiger, recent_value.temperature, recent_value.humidity FROM device_owner JOIN recent_value ON device_owner.deviceNum = recent_value.deviceNum WHERE device_owner.email = '${email}'`;
    var querString = `call getUserProfile('${email}')`;
    executeQuery(res, querString);
}

exports.getUsersInfo = function(res){
    var querString = `call getUserDataForAdmin()`;
    executeQuery(res, querString);
}

exports.getDevices = function(res){
    var querString = `SELECT deviceNum FROM device_sensors ORDER BY deviceNum`;
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

exports.deleteMeasurement = function(deviceNum){
    var querString = `call deleteMeasurement('${deviceNum}')`;
    var success_msg = "Successfully deleted device's measurement values";

    executeQuery_noResponse(querString, success_msg);
}

exports.deleteRecentValue = function(deviceNum){
    var querString = `call deleteRecentValue('${deviceNum}')`;
    var success_msg = "Successfully deleted device's recent value";

    executeQuery_noResponse(querString, success_msg);
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

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Functions for SPANGE

// Functions for spange_device_admin_user table
exports.registerDevice_SPANGE = (res, deviceID) => executeQuery(res, `call registerDevice_SPANGE('${deviceID}')`);
exports.registerAdminUserForDevice_SPANGE = (res, userID, deviceID) => executeQuery(res, `call registerAdminUserForDevice_SPANGE('${deviceID}', '${userID}')`);

// Functions for insert and update data into MySQL tables for SPANGE service
exports.registerDeviceID_SPANGE = (res, userID, deviceID) => executeQuery(res, `call registerDeviceID4SPANGE('${userID}', '${deviceID}')`);
exports.registerUser_SPANGE = (res, userID, token) => executeQuery(res, `call registerGCMTokenWithUserID('${userID}', '${token}')`);
exports.updateGCMTokenByUserID_SPANGE = (res, userID, token) => executeQuery(res, `call updateGCMTokenByUserID('${userID}', '${token}')`)
exports.updateGCMToken_SPANGE = (res, oldToken, newToken) => executeQuery(res, `call updatePushNotificationToken('${oldToken}', '${newToken}')`);


exports.getTokenByDeviceID_SPANGE = (res, deviceID, latitude, longitude) => {
    var queryString = `call getSPANGETokensByDeviceID('${deviceID}')`;
    pool.getConnection((err, conn) => {
        if (err) res.send(err);

        conn.query(queryString, (err, result, fields) => {
            if (err) {
                if (err.sqlMessage)
                    res.send(err.sqlMessage);
                else
                    res.send(err)
                return;
            }

            var title = '긴급 알람 문자';
            var body = '위급한 상황입니다. 위치를 확인해주세요.';

            var data = result[0];
            var success = 0;
            var total = data.length;

            for (var i = 0; i < data.length; i += 1) {
                try {
                    var current_token = data[i].token;

                    // send push notification
                    sendPushNotification(current_token, title, body, latitude, longitude);
                    success += 1;  // increase the success count
                } catch (e) {
                    console.log(e);
                }
            }

            res.send(`total=${total}, successs=${success}`);
        });
    });
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


var executeQuery = (res, queryString) => {
    pool.getConnection(function (err, conn) {
        if (err) {
            res.send(err);
        } else {
            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    console.log(err);

                    // check if error has an attribute called "sqlMessage"
                    if (err.sqlMessage)
                        res.send(err.sqlMessage);
                    else
                        res.send(err);
                } else {
                    res.send(result);
                }
            });

            conn.release();
        }
    });
}

var executeQuery_noResponse = (queryString, success_msg) => {
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
        } else {
            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(success_msg);
                }
            });

            conn.release();
        }
    });
}

var executeQuery_withParams_noResponse = (params, queryString, success_msg) => {
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
            } else {
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
