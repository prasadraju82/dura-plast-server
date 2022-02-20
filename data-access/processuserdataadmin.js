const mysqlconnection = require("./mysqlconnection")

const getUserDetailsForAdmin = () => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("CALL ProcGetUserDetailsForAdmin();", function(err, rows){
                connection.release();
                if (err){
                    return reject(err)
                } 
                console.log(rows);
                resolve(rows[0])
            });
        });
    });
}

const getUserDetailToEdit = (userId) => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("CALL ProcGetUsersToEdit("+ userId +");", function(err, rows){
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

const updateUserDetails = (userDetails) => {
    return new Promise((resolve, reject) => {

        let userId = userDetails.userId;
        let isDistributor = userDetails.isDistributor;
        let hasSpecialStatus = userDetails.hasSpecialStatus;
        let cityTier = userDetails.cityTier;
        let isApproved = userDetails.isApproved;

        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query(`CALL ProcUpdateUserDetailsForAdmin(${isDistributor},${hasSpecialStatus},${cityTier},${userId},${isApproved})`, function(err, rows){
                    connection.release();
                    if (err){
                        return reject(err)
                    } 
                    console.log(rows);
                    resolve(rows)
            });
        });
    });
}

const processuserdataadmin = {
    getUserDetailsForAdmin,
    getUserDetailToEdit,
    updateUserDetails
}

module.exports = processuserdataadmin;