const res = require("express/lib/response");
const processproduct = require("../data-access/processproduct");

exports.getProductPrice = (req, res) => {

    processproduct.getProductPrice().then((result) => {
        //console.log(result);
        res.send({message: "Success", data: result})
    })
}

exports.updateProductPrice = (req, res) => {

    let productDetail = {
        productId: req.body.productId,
        dProdRate1Dist: req.body.newUnitPriceDistributor1,
        dProdRate2Dist: req.body.newUnitPriceDistributor2,
        dProdRate1NonDist: req.body.newUnitPriceNonDistributor1,
        dProdRate2NonDist: req.body.newUnitPriceNonDistributor2
    }
    
    processproduct.updateProductPrice(productDetail).then((result) => {
        res.send({message: "Success", data: result})
    })
}

exports.getProductPriceByUserType = (req, res) => {
    let userType = req.param.userType;
    let productId = req.param.productId;

    processproduct.getProductPriceByUserType(userType, productId).then((result) => {
        res.send({message: "Success", data: result});
    })
}