const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    itemSku: {
        type: String,
        required: true,
        unique: true,
        // index: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
    itemQuantity: {
        type: Number,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },

    itemWarehouse: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'Warehouse',
    },

    itemShipment: {
        type: Schema.Types.ObjectId,
        ref: 'Shipment',
    }

});

const InventoryModel = mongoose.model("Inventory", inventorySchema);
module.exports = InventoryModel;