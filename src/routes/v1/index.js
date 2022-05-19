const app = require("express");
const router = app.Router();
const {StatusCodes} = require('http-status-codes');


const warehouseRoute = require("./warehouse.route/warehouse.route");
const shipmentRoute = require("./shipment.route/shipment.route");
const inventoryRoute = require("./inventory.route/inventory.route");

// Defualt Route
router.get("/", async function (req, res, next) {
    res.status(StatusCodes.OK).json({
      status: "success",
      statusCode: StatusCodes.OK,
      message: `Welcome to the ${process.env.APP_NAME} ${process.env.APP_ENV}inventory tracking API v1`,
      data: "empty"
    });
  });
router.use("/warehouse", warehouseRoute);
router.use("/shipment", shipmentRoute);
router.use("/inventory", inventoryRoute);

module.exports = router;
