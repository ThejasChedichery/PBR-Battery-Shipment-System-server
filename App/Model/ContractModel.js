
const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({

    contractId: { type: String, required: true, unique: true },
    deviceCount: { type: Number, required: true },
    batteriesShipped: { type: Number, default: 0 },
    threshold: {
        type: Number, required: true,
        default: function () {
            return this.deviceCount * 1.2
        }
    },
    isLocked: { type: Boolean, default: false },
    lastUpdated: { type: Date, default: Date.now },
    notificationsSent: [{
        email: String,
        timestamp: { type: Date, default: Date.now },
        message: String
    }]

}, { timestamps: true })

const ContractData = mongoose.model('contract', ContractSchema);
module.exports = ContractData;