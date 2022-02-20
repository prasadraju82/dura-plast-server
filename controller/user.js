const processuserdataadmin = require('../data-access/processuserdataadmin');

exports.getUserDetailsForAdmin = (req, res) => {
    let customerId = req.params.customerId
    processuserdataadmin.getUserDetailsForAdmin().then((result) => {
        res.send({message: "Success", data: result})
    })
}

exports.getUserDetailToEditAdmin = (req, res) => {
    let userId = req.params.userid;
    processuserdataadmin.getUserDetailToEdit(userId).then((result) => {
        res.send({message: "Success", data: result});
    })
}

exports.updateUserDetailAdmin = (req, res) => {
    let user = {
        userId: req.body.userId,
        isDistributor: req.body.isDistributor,
        hasSpecialStatus: req.body.hasSpecialStatus,
        cityTier: req.body.cityTier,
        isApproved: req.body.isApproved
    }
    console.log(user);
    processuserdataadmin.updateUserDetails(user).then((result) => {
        res.send({message: "Success", data: result});
    })
}