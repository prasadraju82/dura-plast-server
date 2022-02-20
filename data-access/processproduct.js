const mysqlconnection = require("./mysqlconnection")

const getProductPrice = () => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT * FROM products", function(err, rows){
                connection.release();
                if (err){
                    return reject(err)
                } 
                //console.log(rows);
                resolve(rows)
            });
        });
    });
}

const updateProductPrice = (productDetail) =>{
    console.log(productDetail);
    return new Promise((resolve, reject) => {
        let productId = productDetail.productId;
        let dProdRate1Dist = productDetail.dProdRate1Dist;
        let dProdRate2Dist = productDetail.dProdRate2Dist;
        let dProdRate1NonDist = productDetail.dProdRate1NonDist;
        let dProdRate2NonDist = productDetail.dProdRate2NonDist;
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query(`CALL ProcUpdateProductPrice(${productId},${dProdRate1Dist},${dProdRate2Dist},${dProdRate1NonDist},${dProdRate2NonDist})`, function(err, rows){
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

getProductPriceByUserType = (userType, productId) => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query(`ProcgetProductPriceByUserType('${userType}', ${productId})`, function(err, rows){
                connection.release();
                if (err){
                    return reject(err)
                } 
                //console.log(rows);
                resolve(rows[0][0]);
            });
        });
    });
}

const processproduct = {
    getProductPrice, updateProductPrice, getProductPriceByUserType
}

module.exports = processproduct;