'use strict';

const mysql = require('mysql');

/**
 * This variable creates the connection pool to control the database connections.
 *
 * @type {Pool} the connection pool.
 */
let pool = mysql.createPool({
    host: 'localhost', //TODO
    user: 'root',
    password: 'sung0429',
    port: 3306,
    database: 'groomdb57ywyj', //TODO
    connectionLimit : 100
});