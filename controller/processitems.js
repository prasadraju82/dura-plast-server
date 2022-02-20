const { response } = require("express")
const res = require("express/lib/response")
//const res = require("express/lib/response")
const processitem = require("../data-access/processitem")
const processitems = require("../data-access/processitem")

exports.saveUserItems = (req, res) => {
    console.log(req.body)
    var items = {
        itemId: req.body.itemId,
        itemName: req.body.itemName,
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        sessionId: req.body.sessionId,
        color: req.body.color,
        texture: req.body.texture,
        length: req.body.length,
        width: req.body.width,
        series: req.body.series,
        packing: req.body.packing,
        noOfItems: req.body.noOfItems,
        weight: req.body.weight,
        volume: req.body.volume,
        design: req.body.design,
        designType: req.body.designType,
        drawing: req.body.drawing,
        diameter1: req.body.diameter1,
        diameter2: req.body.diameter2,
        MOC: req.body.MOC,
        retailPrice: req.body.retailPrice,
        distributorPrice: req.body.distributorPrice,
        thickness: req.body.thickness,
        status: req.body.status
    }

    processitem.saveUserItems(items).then((result) => {
        console.log(result);
        res.send({ message: "Success"});
    }).catch()
}

exports.getPlacedOrders = (req, res) => {
    let customerId = req.params.customerId;

    processitem.getItemsByCustomer(customerId).then((result) => {
        //console.log(result);
        let resp = JSON.stringify(result);
        res.send({ message: "Success", data: resp});
    }).catch();
}

exports.getPlacedOrderDetails = (req, res) => {
    let ItemOrderId = req.params.ItemOrderId;

    processitem.getItemsOrderedInDetail(ItemOrderId).then((result) => {
        res.send({ message: "Success", data: result});
    }).catch();
}

exports.getPlacedOrderDetailsForEdit = (req, res) => {
    let ItemOrderId = req.params.ItemOrderId;

    processitem.getItemsOrderedInDetailForEdit(ItemOrderId).then((result) => {
        res.send({ message: "Success", data: result});
    }).catch();
}

exports.updatePlacedOrder = (req, res) =>{

    var items = {
        itemOrderDetailId: req.body.itemOrderDetailId,
        itemOrderId: req.body.itemOrderId,
        itemId: req.body.itemId,
        itemName: req.body.itemName,
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        sessionId: req.body.sessionId,
        color: req.body.color,
        texture: req.body.texture,
        length: req.body.length,
        width: req.body.width,
        series: req.body.series,
        packing: req.body.packing,
        noOfItems: req.body.noOfItems,
        weight: req.body.weight,
        volume: req.body.volume,
        design: req.body.design,
        designType: req.body.designType,
        drawing: req.body.drawing,
        diameter1: req.body.diameter1,
        diameter2: req.body.diameter2,
        MOC: req.body.MOC,
        retailPrice: req.body.retailPrice,
        distributorPrice: req.body.distributorPrice,
        thickness: req.body.thickness
    }

    processitems.updatePlacedOrder(items).then((result) => {
        console.log(result);
        res.send({ message: "Success"});
    }).catch()

}

exports.deletePlacedOrder = (req, res) =>{
    let itemOrderDetailId = req.body.itemOrderDetailId;
    let itemOrderId = req.body.itemOrderId;

    processitems.deletePlacedOrder(itemOrderDetailId, itemOrderId).then((result) => {
        console.log(result);
        res.send({ message: "Success"});
    }).catch()
}

exports.getCorrugation = (req, res) => {

    processitems.getCorrugation().then((result) => {
        console.log(result);
        res.send({message: "Success", data: result})
    })
}

exports.getProfiled = (req, res) => {

    processitems.getProfiled().then((result) => {
        res.send({message: "Success", data: result})
    })
}

exports.getDrawing = (req, res) => {

    let profileId = req.params.profileId
    processitems.getDrawing(profileId).then((result) => {
        console.log(result);
        res.send({message: "Success", data: result})
    })
}

exports.getSeries = (req, res) => {

    processitems.getSeries().then((result) => {
        console.log(result);
        res.send({message: "Success", data: result})
    })
}

/* 05-02-2022 */
exports.getNeckDiameter = (req, res) => {
    let neck = req.params.neck
    processitems.getNeckDiameter(neck).then((result) => {
        console.log(result);
        res.send({message: "Success", data: result})
    })
}

exports.getPolycarbonateLength = (req, res) => {
    processitems.getPolycarbonateLength().then((result) => {
        console.log(result);
        res.send({message: "Success", data: result})
    })
}

exports.getPolycarbonateDesign = (req, res) => {
    processitems.getPolycarbonateDesign().then((result) => {
        res.send({message: "Success", data: result})
    })
}

exports.getPolycarbonateCorrugatedWidth = (req, res) => {
    processitems.getPolycarbonateCorrugatedWidth().then((result) => {
        res.send({message: "Success", data: result})
    }).catch((error) => {
        res.send({message:"Error", data: error})
    })
}

exports.getPolycarbonateProfiledWidth = (req, res) => {
    processitems.getPolycarbonateProfiledWidth().then((result) => {
        res.send({message: "Success", data: result})
    })
}

exports.getPolycarbonateCorrugation = (req, res) => {
    processitems.getPolycarbonateCorrugation().then((result) => {
        res.send({message: "Success", data: result})
    })
}

exports.getPolycarbonateProfiled = (req, res) => {
    processitems.getPolycarbonateProfiled().then((result) => {
        res.send({message: "Success", data: result})
    })
}

exports.getPolycarbonateDrawing = (req, res) => {
    let profileId = req.params.profileId
    processitems.getPolycarbonateDrawing(profileId).then((result) => {
        res.send({message: "Success", data: result})
    })
}

exports.getOrderCount = (req, res) => {
    let customerId = req.params.customerId
    processitems.getOrderCount(customerId).then((result) => {
        res.send({message: "Success", data: result})
    })
}

exports.getOrderSummaryCustomer = (req, res) => {
    let customerId = req.params.customerId
    processitems.getOrderSummaryCustomer(customerId).then((result) => {
        res.send({message: "Success", data: result})
    })
}