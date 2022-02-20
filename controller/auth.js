const { generateOTP, fast2sms } = require("../util/otp");
const processuserdata = require("../data-access/processuserdata")
var jwt = require("jsonwebtoken");
//var bcrypt = require("bcrypt");

exports.signIn = (req, res, next) => {
    try{
        let mobileNo = req.params.mobileno;
        let userCount = "";
         processuserdata.checkUser(mobileNo).then((result) => {
            userCount = result.userCount;
            const otp = generateOTP(6);
            //console.log(mobileNo);
            //console.log(otp);

            if(userCount > 0){
                processuserdata.saveOTP(otp, mobileNo).then((data) => {
                    fast2sms({
                                message: `This is a test. Your OTP is ${otp} - Raju`,
                                contactNumber: mobileNo,
                            },next);
                    return res.status(200).json({message: "Success"});
                }).catch();
            }
            else{
                return res.status(200).json({message: "Failed"});
            }
        }).catch();
    }
    catch(error){
        next(error)
    }
}

exports.confirmOTP = (req, res) => {
    let mobileNo = req.params.mobileno;
    let otp = req.params.otp;
    processuserdata.confirmOTP(otp, mobileNo).then((result) => {

        if(result !== undefined){
            let userId = result.UserId;
            let userName = result.UserName;
            let emailId = result.EmailId;
            let timeDiff = result.differenceInTime;
            let location = result.City;
            let isDistributor = result.IsDistributor
            console.log(isDistributor);
            if(timeDiff > 15){
                return res.status(200).json({message: "Failed", reason: "OTP Expired"});
            }

            var token = jwt.sign({ id: emailId }, otp, {
                expiresIn: 86400 // 24 hours
            });

            return res.status(200).json({message:"Success", userToken: token, userid: userId, username: userName, mobileNo: mobileNo, emailid: emailId, location: location, isDistributor: isDistributor});
        }
            
        return res.status(200).json({message: "Failed", reason: "Invalid OTP"});
        
    }).catch();
}

exports.registerUser = (req, res) => {

    var userDetails = {
        userName: req.body.userName,
        emailId: req.body.emailId,
        mobileNo: req.body.mobileNo,
        address: req.body.address,
        city: req.body.city
    }

    processuserdata.registerUser(userDetails).then((result) => {
        if(result.Message === "Success"){
            res.send({ message: "Success"});
        }
        else{
            res.send({ message: result.Message});
        }
        
    }).catch((error) => {
        console.log(error);
    })
}