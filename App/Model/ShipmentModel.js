
const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({

    shipmentId: { type: String, required: true, unique: true },
    contractId: { type: String, required: true, ref: 'contract' },
    batteriesShipped: { type: Number, required: true, min: 1 },
    timestamp: { type: Date, default: Date.now },
    status: {
        type: String,
        required: true,
        enum: ['APPROVED', 'BLOCKED', 'PENDING'],
        default: 'PENDING'
    },
    initiatedBy: { type: String, required: true }
}, { timestamps: true })

const ShipmentData = mongoose.model('shipment', ShipmentSchema);
module.exports = ShipmentData;