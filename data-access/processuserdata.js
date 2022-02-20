const mysql = require("mysql");
const mysqlconnection = require("./mysqlconnection")

const con = mysql.createConnection({
    host: "localhost", // host for connection
    port: 3306, // default port for mysql is 3306
    database: "dura-plast", // database from which we want to connect out node application
    user: "root", // username of the mysql connection
    password: "" // password of the mysql connection
    });

const pool = mysql.createPool({
    host: "localhost", // host for connection
    port: 3306, // default port for mysql is 3306
    database: "dura-plast", // database from which we want to connect out node application
    user: "root", // username of the mysql connection
    password: "" // password of the mysql connection
    });

const checkUser = (mobileNo) => {
    //connection.connect();
    let user = "";
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("CALL ProcCheckUserExists('" + mobileNo + "');", function(err, rows){
                if (err){
                    return reject(err)
                } 
                console.log(rows);
                resolve(rows[0][0])
            });
        });
    });
}

const registerUser = (userDetails) => {
    return new Promise((resolve, reject) => {

        let userName = userDetails.userName;
        let emailId = userDetails.emailId;
        let mobileNo = userDetails.mobileNo;
        let address = userDetails.address
        let city = userDetails.city;

        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query(`CALL ProcRegisterUsers('${userName}','${emailId}','${mobileNo}','${address}',
                '${city}')`, function(err, rows){
                    connection.release();
                    if (err){
                        return reject(err)
                    } 
                    console.log(rows);
                    resolve(rows[0][0])
            });
        });
    });
}

const saveOTP = (otp, mobileNo) => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("CALL ProcUpdateUserOTP("+ otp +",'" + mobileNo + "');", function(err, rows){
                if (err){
                    return reject(err)
                } 
                console.log(rows);
                resolve(rows[0][0])
            });
        });
    });
}

const confirmOTP = (otp, mobileNo) => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("CALL ProcGetUserDetails('"+ otp +"','" + mobileNo + "');", function(err, rows){
                if (err){
                    return reject(err)
                } 
                console.log(rows);
                resolve(rows[0][0])
            });
        });
    });
}

const processuserdata = {
    checkUser,
    saveOTP,
    confirmOTP,
    registerUser
}

module.exports = processuserdata;