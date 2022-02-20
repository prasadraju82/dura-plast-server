const controller = require('../controller/auth');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/auth/signin/:mobileno", controller.signIn);
    app.get("/api/auth/confirmotp/:mobileno/:otp", controller.confirmOTP);
    app.post("/api/auth/registerUser", controller.registerUser);
};