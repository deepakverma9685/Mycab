var mysql = require('mysql');
var db_constants = require('../constants/databaseConstants');


var connection = mysql.createConnection({
    host:db_constants.db_host,
    user:db_constants.db_user,
    password:db_constants.db_password,
    database:db_constants.db_name,
    port:db_constants.db_port
});

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }else {
        console.log('Connected to database Succesfully.');
    }
});

module.exports = connection;