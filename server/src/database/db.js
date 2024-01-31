const mysql = require('mysql');
require('dotenv').config();
const db = mysql.createConnection({
    user: process.env.user,
    host: process.env.host,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
});

module.exports = db;