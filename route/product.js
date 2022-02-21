const controller = require('../controller/processitems');
const productcontroller = require('../controller/processproduct');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/product/purchaseproduct", controller.saveUserItems);
    app.get("/api/product/getProductsByCustomer/:customerId", controller.getPlacedOrders);
    app.get("/api/product/getProductOrderedDetail/:ItemOrderId", controller.getPlacedOrderDetails);
    app.get("/api/product/getProductOrderedDetailForEdit/:ItemOrderId", controller.getPlacedOrderDetailsForEdit);
    app.post("/api/product/updatePlacedOrder", controller.updatePlacedOrder);
    app.post("/api/product/deletePlacedOrder", controller.deletePlacedOrder);
    app.get("/api/product/getCorrugation", controller.getCorrugation);
    app.get("/api/product/getProfiled", controller.getProfiled);
    app.get("/api/product/getDrawing/:profileId", controller.getDrawing);
    app.get("/api/product/getSeries", controller.getSeries);
    //05-02-2022
    app.get("/api/product/getNeckDiameter/:neck", controller.getNeckDiameter);
    app.get("/api/product/getPolycarbonateLength", controller.getPolycarbonateLength);
    app.get("/api/product/getPolycarbonateDesign", controller.getPolycarbonateDesign);
    app.get("/api/product/getPolycarbonateCorrugatedWidth", controller.getPolycarbonateCorrugatedWidth);
    app.get("/api/product/getPolycarbonateProfiledWidth", controller.getPolycarbonateProfiledWidth);
    app.get("/api/product/getPolycarbonateCorrugation", controller.getPolycarbonateCorrugation);
    app.get("/api/product/getPolycarbonateProfiled", controller.getPolycarbonateProfiled);
    app.get("/api/product/getPolycarbonateDrawing/:profileId", controller.getPolycarbonateDrawing);

    //--
    app.get("/api/product/getOrderCount/:customerId", controller.getOrderCount);

    //--
    app.get("/api/product/getOrderSummaryCustomer/:customerId", controller.getOrderSummaryCustomer);

    //--
    app.get("/api/product/getProductPrice", productcontroller.getProductPrice);
    app.post("/api/product/updateProductPrice", productcontroller.updateProductPrice);
    app.get("/api/product/getProductPriceByUserType/:userType/:productId", productcontroller.getProductPriceByUserType);
};