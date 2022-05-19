const express = require("express");
const router = express.Router();
const warehouseController = require("../../../controllers/warehouse.controller/warehouse.controller");
const inventoryController = require("../../../controllers/inventory.controller/inventory.controller");
const shipmentController = require("../../../controllers/shipment.controller/shipment.controller");


// Create a new item in the inventory
router.post("/add-item", inventoryController.addItemToInventory);

// Get all items in the inventory
router.get("/get-all-items", inventoryController.getAllItems);

// Update an item in the inventory
router.put("/update-item/:item_sku", inventoryController.updateItem);

// Delete an item in the inventory
router.delete("/delete-item/:item_sku", inventoryController.deleteItem);



module.exports = router;