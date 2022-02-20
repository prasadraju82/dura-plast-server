const controller = require('../controller/user');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/user/getUserDetails", controller.getUserDetailsForAdmin);
    app.get("/api/user/getUserDetailToEditAdmin/:userid", controller.getUserDetailToEditAdmin);
    app.post("/api/user/updateUserDetailAdmin", controller.updateUserDetailAdmin);
}