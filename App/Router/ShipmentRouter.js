
const express = require('express')
const Router = express.Router()
const { Validation } = require('../../Validation/Validation')
const { RecordShipmentData, FindAllShipment,FindSingleShipment} =require('../Controller/ShipmentController')

Router.post('/',Validation,RecordShipmentData)
Router.get('/',FindAllShipment)
Router.get('/:shipmentId',FindSingleShipment)

module.exports= Router