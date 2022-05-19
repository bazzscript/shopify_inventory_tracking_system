const express = require("express");
const router = express.Router();
const warehouseController = require("../../../controllers/warehouse.controller/warehouse.controller");
const inventoryController = require("../../../controllers/inventory.controller/inventory.controller");
const shipmentController = require("../../../controllers/shipment.controller/shipment.controller");


// Create a new warehouse
router.post("/add-warehouse", warehouseController.addNewWarehouse);

// Get all warehouses
router.get("/get-all-warehouses", warehouseController.getAllWarehouses);

// Update a warehouse
router.put("/update-warehouse/:warehouse_id", warehouseController.updateWarehouse);

// Delete a warehouse
router.delete("/delete-warehouse/:warehouse_id", warehouseController.deleteWarehouse);

module.exports = router;