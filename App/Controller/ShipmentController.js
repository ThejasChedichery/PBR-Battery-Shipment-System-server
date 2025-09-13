
const ContractData = require('../Model/ContractModel')
const ShipmentData = require('../Model/ShipmentModel')
const SendMail = require('../../Mailer/NodeMailer')
const mongoose = require('mongoose')

//  Record shipment details
const RecordShipmentData = async (req, res) => {

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const contract = await ContractData.findOne({ contractId: req.body.contractId }).session(session)

        if (!contract) {
            throw Error('No contract found')
        }

        const newQnty = contract.batteriesShipped + req.body.quantity
        let count = await ShipmentData.countDocuments() + 1
        if (newQnty > contract.threshold || contract.isLocked) {

          await ContractData.updateOne({ contractId: req.body.contractId }, {
                isLocked: true,
                lastUpdated: new Date()
            },{session})
            const blockShipment = new ShipmentData({
                shipmentId: "ship" + count,
                contractId: req.body.contractId,
                batteriesShipped: req.body.quantity,
                status: 'BLOCKED',
                initiatedBy: req.body.userId
            })

            const mailBody = {
                contractId: contract.contractId,
                deviceCount: contract.deviceCount,
                batteriesShipped: contract.batteriesShipped,
                threshold: contract.threshold
            }

            SendMail(mailBody)

            const saveShipment = await blockShipment.save({session})
            await session.commitTransaction(); 
            session.endSession();

            const statusBlocked = await ContractData.find()
            const io = req.app.get('io');
            io.emit('shipmentAdded', saveShipment);
            io.emit('contractBlocked',statusBlocked)
            res.status(200).send({ message: "Shipment blocked ! Total exceed threshold or locked", saveShipment })
        }

        else {

             await ContractData.updateOne({ contractId: req.body.contractId }, {
                batteriesShipped: newQnty,
                lastUpdated: new Date()
            },{session})

            const allowShpment = new ShipmentData({
                shipmentId: "ship" + count,
                contractId: req.body.contractId,
                batteriesShipped: req.body.quantity,
                status: 'APPROVED',
                initiatedBy: req.body.userId
            })
            const saveShipment = await allowShpment.save({session})
            await session.commitTransaction(); 
            session.endSession();

            const io = req.app.get('io');
            io.emit('shipmentAdded', saveShipment);
            res.status(200).send({ message: "Shipment Approved !", saveShipment })
        }

    } catch (err) {
        if (session.inTransaction()) {
            await session.abortTransaction(); 
        }
        console.log(err);
        
        session.endSession();
        res.status(500).send({ message: "Can't processing the shipment", err })
    }
}

//Get all shipment
const FindAllShipment = async (req, res) => {

    try {
        const allShipment = await ShipmentData.find()
        res.status(200).send(allShipment)
    } catch (err) {
        res.status(500).send({ message: 'canot added Shipment', err })
    }
}

// Get shipment by id
const FindSingleShipment = async (req, res) => {

    try {
        const singleShipment = await ShipmentData.findOne(req.params)
        if (singleShipment != null) {

            res.status(200).send(singleShipment)
        }
        else {
            res.status(400).send({ message: "No shipment avaliable" })
        }

    } catch (err) {
        res.status(500).send({ message: "Can't find shipment", err })
    }

}


module.exports = { RecordShipmentData, FindAllShipment, FindSingleShipment }