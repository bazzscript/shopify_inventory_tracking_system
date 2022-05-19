const {
    StatusCodes
} = require('http-status-codes');
const InventoryModel = require('../../models/inventory.model');
const custom_uid = require('../../utils/utils');

const Inventory = {}

// Create a new item in the inventory
Inventory.addItemToInventory = async (req, res) => {
    try {
        const body = await req.body;
        if (!body) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the request body is empty"
            });
        }

        const itemName = body.item_name;
        const itemDescription = body.item_description;
        const itemQuantity = body.item_quantity;
        const itemPrice = body.item_price;
        let itemWarehouse = body.item_warehouse;

        // Confirm all the required fields are present, not empty and valid
        if (!itemName) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the item name is empty"
            });
        }
        if (!itemDescription) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the item description is empty"
            });
        }
        if (!itemQuantity || itemQuantity < 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the item quantity is empty or 0"
            });
        }
        if (!itemPrice || itemPrice < 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the item price is empty or 0"
            });
        }
        if (!itemWarehouse) {
            // itemWarehouse = null;
            return res.status(StatusCodes.BAD_REQUEST).json({

                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the item warehouse is empty"
            });
        }


        // Confirm chosen warehouse exists in the db
        try {
            await InventoryModel.findById(itemWarehouse);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the warehouse id does not exist"
            });
        }

        // Create a new item in the inventory
        const item = await new InventoryModel({
            itemSku: custom_uid.sku_number(),
            itemName: itemName,
            itemDescription: itemDescription,
            itemQuantity: itemQuantity,
            itemPrice: itemPrice,
            itemWarehouse: itemWarehouse
        })

        // Save the new item in the db
        const newItem = await item.save();

        return res.status(StatusCodes.OK).json({
            status: "success",
            status_code: StatusCodes.OK,
            message: "Item added successfully",
            data: newItem
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "error",
            status_code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
}

// Get all items in the inventory
Inventory.getAllItems = async (req, res) => {
    try {
        const items = await InventoryModel.find();
        return res.status(StatusCodes.OK).json({
            status: "success",
            status_code: StatusCodes.OK,
            message: "All items retrieved successfully",
            data: {
                items: items
            }
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "error",
            status_code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
}


// Update an item in the inventory
Inventory.updateItem = async (req, res) => {
    try {
        const body = await req.body;
        const item_sku = req.params.item_sku;
        if (!item_sku) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the item sku is undefined"
            });
        }

        // Confirm the item exists in the db
        const item = await InventoryModel.findOne({
            itemSku: item_sku
        });
        if (!item) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the item sku is invalid"
            });
        }

        if (!body) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the request body is empty"
            });
        }

        const itemSku = item_sku;
        const itemName = body.item_name;
        const itemDescription = body.item_description;
        const itemQuantity = body.item_quantity;
        const itemPrice = body.item_price;
        const itemWarehouse = body.item_warehouse;

        // If any of the parrameters has a value, proceed to update the item
        if (itemName || itemDescription || itemQuantity || itemPrice || itemWarehouse) {

            if (itemWarehouse) {
                // Confirm chosen warehouse exists in the db
                try {
                    await InventoryModel.findById(itemWarehouse);
                } catch (error) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        status: "error",
                        status_code: StatusCodes.BAD_REQUEST,
                        message: "the warehouse id does not exist"
                    });
                }
            }

            const data = {
                itemName: itemName,
                itemDescription: itemDescription,
                itemQuantity: itemQuantity,
                itemPrice: itemPrice,
                itemWarehouse: itemWarehouse
            }
            // Update the item in the db
            const updatedItem = await InventoryModel.findOneAndUpdate({
                itemSku: itemSku
            }, data, {
                new: true
            });

            return res.status(StatusCodes.OK).json({
                status: "success",
                status_code: StatusCodes.OK,
                message: "Item updated successfully",
                data: updatedItem
            });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the request body is empty"
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "error",
            status_code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
}


// Delete an item in the inventory
Inventory.deleteItem = async (req, res) => {
    try {
        const item_sku = req.params.item_sku;
        if (!item_sku) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the item sku is undefined"
            });
        }

        // Confirm the item exists in the db
        const item = await InventoryModel.findOne({
            itemSku: item_sku
        });
        if (!item) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                status_code: StatusCodes.BAD_REQUEST,
                message: "the item sku has been deleted or is invalid"
            });
        }

        // Delete the item from the db
        await InventoryModel.findOneAndDelete({
            itemSku: item_sku
        });

        return res.status(StatusCodes.OK).json({
            status: "success",
            status_code: StatusCodes.OK,
            message: "Item deleted successfully",
            // data: deletedItem
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "error",
            status_code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
}



module.exports = Inventory;