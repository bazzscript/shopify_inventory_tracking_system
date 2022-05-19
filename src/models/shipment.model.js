const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    shipmentNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    shipmentDate: {
        type: Date,
        required: true,
    },
    shipmentStatus: {
        type: String,
        required: true,
    },
    shipmentType: {
        type: String,
        required: true,
    },
    shipmentFrom: {
        type: String,
        required: true,
    },
    shipmentTo: {
        type: String,
        required: true,
    },
  });

const ShipmentModel = mongoose.model("Shipment", shipmentSchema);
module.exports = ShipmentModel;