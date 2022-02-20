const mysqlconnection = require("./mysqlconnection")

const saveUserItems = (itemDetails) => {
    return new Promise((resolve, reject) => {
        console.log(itemDetails)

        let itemId = itemDetails.itemId;
        let itemName = itemDetails.itemName;
        let customerId = itemDetails.customerId;
        let customerName = itemDetails.customerName;
        let sessionId = itemDetails.sessionId;
        let color = itemDetails.color;
        let texture = itemDetails.texture;
        let length = itemDetails.length;
        let width = itemDetails.width;
        let series = itemDetails.series;
        let packing = itemDetails.packing;
        let noOfItems = itemDetails.noOfItems;
        let weight = itemDetails.weight;
        let volume = itemDetails.volume;
        let design = itemDetails.design;
        let designType = itemDetails.designType;
        let drawing = itemDetails.drawing;
        let diameter1 = itemDetails.diameter1;
        let diameter2 = itemDetails.diameter2;
        let MOC = itemDetails.MOC;
        let retailPrice = itemDetails.retailPrice;
        let distributorPrice = itemDetails.distributorPrice;
        let thickness = itemDetails.thickness;
        let status = itemDetails.status;
    console.log("width: " + width)
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query(`CALL ProcPlaceItemsOrder(${itemId},'${itemName}',${customerId},'${customerName}','${sessionId}',
            ${color}, ${texture}, ${length}, ${width}, ${series}, '${packing}', ${noOfItems}, ${weight}, ${volume},
            '${design}', '${designType}', '${drawing}', ${diameter1}, ${diameter2}, '${MOC}', ${retailPrice}, ${distributorPrice},
             ${status},${thickness})`, function(err, rows){
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

const getItemsByCustomer = (customerId) => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("CALL ProcGetCurrentOrder("+ customerId +");", function(err, rows){
                connection.release();
                if (err){
                    return reject(err)
                } 
                console.log(rows);
                resolve(rows[0])
            });
        });
    })
}

const getItemsOrderedInDetail = (ItemOrderId) => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("CALL ProcGetItemOrderDetail("+ ItemOrderId +");", function(err, rows){
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

const getItemsOrderedInDetailForEdit = (ItemOrderId) => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("CALL ProcGetItemOrderDetailForEdit("+ ItemOrderId +");", function(err, rows){
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

const updatePlacedOrder = (itemDetails) => {
    return new Promise((resolve, reject) => {
        console.log(itemDetails)

        let itemOrderDetailId = itemDetails.itemId;
        let itemOrderId = itemDetails.itemOrderId;
        let itemId = itemDetails.itemId;
        let itemName = itemDetails.itemName;
        let customerId = itemDetails.customerId;
        let customerName = itemDetails.customerName;
        let sessionId = itemDetails.sessionId;
        let color = itemDetails.color;
        let texture = itemDetails.texture;
        let length = itemDetails.length;
        let width = itemDetails.width;
        let series = itemDetails.series;
        let packing = itemDetails.packing;
        let noOfItems = itemDetails.noOfItems;
        let weight = itemDetails.weight;
        let volume = itemDetails.volume;
        let design = itemDetails.design;
        let designType = itemDetails.designType;
        let drawing = itemDetails.drawing;
        let diameter1 = itemDetails.diameter1;
        let diameter2 = itemDetails.diameter2;
        let MOC = itemDetails.MOC;
        let retailPrice = itemDetails.retailPrice;
        let distributorPrice = itemDetails.distributorPrice;
        let thickness = itemDetails.thickness;

        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query(`CALL ProcUpdatePlacedOrder(${itemOrderDetailId},'${itemOrderId}',${itemId},'${itemName}',${customerId},'${customerName}','${sessionId}',
            ${color}, ${texture}, ${length}, ${width}, ${series}, '${packing}', ${noOfItems}, ${weight}, ${volume},
            '${design}', '${designType}', '${drawing}', ${diameter1}, ${diameter2}, '${MOC}', ${retailPrice}, ${distributorPrice},
            ${thickness})`, function(err, rows){
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

const deletePlacedOrder = (itemOrderDetailId, itemOrderId) => {
    return new Promise((resolve, reject) => {
        let itemOrderDetailId = itemDetails.itemId;
        let itemOrderId = itemDetails.itemOrderId;
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query(`CALL ProcDeletePlacedOrder(${itemOrderDetailId},'${itemOrderId}')`, function(err, rows){
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

const getCorrugation = () => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT * FROM corrugation ORDER BY id", function(err, rows){
                connection.release();
                if(err){
                    return reject(err)
                }
                console.log(rows);
                console.log(rows[0]);
                resolve(rows);
            })
        })
    });
}

const getProfiled = () => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT * FROM profiled ORDER BY id", function(err, rows){
                connection.release();

                if(err){
                    return reject(err)
                }

                resolve(rows);
            })
        })
    })
}

const getDrawing = (profileId) => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT id,name FROM drawing WHERE profileId = " + profileId + " ORDER BY id", function(err, rows){
                connection.release();
                if(err){
                    return reject(err)
                }

                resolve(rows);
            })
        })
    })
}

const getSeries = () => {
    return new Promise((resolve, reject) => {
        console.log("Series");
        mysqlconnection.pool.getConnection(function(err, connection){
            console.log(err);
            connection.query("SELECT id,name FROM series ORDER BY id", function(err, rows){
                connection.release();
                if(err){
                    console.log(err)
                    return reject(err)
                }
                console.log(rows)
                resolve(rows);
            })
            
        })
    })
}
// 05-02-2022
const getNeckDiameter = (neck) => {
    return new Promise ((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT id, dimension from neckdiameter WHERE necksize = " + neck, function(err, rows){
                connection.release();
                if(err){
                    return reject(err);
                }
                resolve(rows);
            })
        })
    })
}

const getPolycarbonateLength = () => {
    return new Promise ((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT id, length from polycarbonatelength", function(err, rows){
                connection.release();
                if(err){
                    return reject(err);
                }
                resolve(rows);
            })
        })
    })
}

const getPolycarbonateDesign = () => {
    return new Promise ((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT id, name from polycarbonatedesign", function(err, rows){
                connection.release();
                if(err){
                    return reject(err);
                }
                resolve(rows);
            })
        })
    })
}

const getPolycarbonateCorrugatedWidth = () => {
    return new Promise ((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT id, name from polycarbonatecorrugatedwidth", function(err, rows){
                connection.release();
                if(err){
                    return reject(err);
                }
                resolve(rows);
            })
        })
    })
}

const getPolycarbonateProfiledWidth = () => {
    return new Promise ((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT id, name from polycarbonateprofiledwidth", function(err, rows){
                connection.release();
                if(err){
                    return reject(err);
                }
                resolve(rows);
            })
        })
    })
}

const getPolycarbonateCorrugation = () => {
    return new Promise ((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT id, name from polycarbonatecorrugation", function(err, rows){
                connection.release();
                if(err){
                    return reject(err);
                }
                resolve(rows);
            })
        })
    })
}

const getPolycarbonateProfiled = () => {
    return new Promise ((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT id, name from polycarbonateprofiled", function(err, rows){
                connection.release();
                if(err){
                    return reject(err);
                }
                resolve(rows);
            })
        })
    })
}

const getPolycarbonateDrawing = (profileId) => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT id,name FROM polycarbonatedrawing WHERE profileId = " + profileId + " ORDER BY id", function(err, rows){
                connection.release();
                if(err){
                    return reject(err)
                }

                resolve(rows);
            })
        })
    })
}

//==============================

const getOrderCount = (customerId) => {
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT COUNT(*) AS 'ProductCount' FROM itemorder WHERE IsActive = TRUE AND CustomerId = " + customerId, function(err, rows){
                connection.release();
                if(err){
                    return reject(err)
                }

                resolve(rows[0]);
            })
        })
    })
}

const getOrderSummaryCustomer = (customerId) => {
    console.log(customerId);
    return new Promise((resolve, reject) => {
        mysqlconnection.pool.getConnection(function(err, connection){
            connection.query("SELECT ItemOrderId,ItemId, ItemName, NoOfItems, OrderDate FROM itemorder WHERE NoOfItems IS NOT NULL AND OrderStatus = 1 AND IsActive = TRUE AND customerId = " + customerId + " ORDER BY ItemOrderId", function(err, rows){
                connection.release();
                if(err){
                    return reject(err)
                }

                resolve(rows);
            })
        })
    })
}

const processitem = {
    saveUserItems,
    getItemsByCustomer,
    getItemsOrderedInDetail,
    getItemsOrderedInDetailForEdit,
    updatePlacedOrder,
    deletePlacedOrder,
    getCorrugation,
    getProfiled,
    getDrawing,
    getSeries,
    getNeckDiameter,
    getPolycarbonateLength,
    getPolycarbonateDesign,
    getPolycarbonateCorrugatedWidth,
    getPolycarbonateProfiledWidth,
    getPolycarbonateCorrugation,
    getPolycarbonateProfiled,
    getPolycarbonateDrawing,
    getOrderCount,
    getOrderSummaryCustomer
}

module.exports = processitem;