const mysql = require("mysql");

const con = mysql.createConnection({
    host: "sql6.freemysqlhosting.net", // host for connection
    port: 3306, // default port for mysql is 3306
    database: "sql6473244", // database from which we want to connect out node application
    user: "sql6473244", // username of the mysql connection
    password: "m7Iv3MaXAa" // password of the mysql connection
});

const pool = mysql.createPool({
    connectionLimit : 100,
    host: "sql6.freemysqlhosting.net", // host for connection
    port: 3306, // default port for mysql is 3306
    database: "sql6473244", // database from which we want to connect out node application
    user: "sql6473244", // username of the mysql connection
    password: "m7Iv3MaXAa" // password of the mysql connection
});

const mysqlconnection = {
    con,
    pool
}

module.exports = mysqlconnection;