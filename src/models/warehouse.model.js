const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    warehouseNumber: {
        type: String,
        required: true
    },
    warehouseName: {
        type: String,
        required: true,
    },
    warehouseAddress: {
        type: String,
        required: true,
    },

});

const WarehouseModel = mongoose.model("Warehouse", warehouseSchema);
module.exports = WarehouseModel;