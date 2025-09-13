
const express = require('express')
const Router = express.Router()
const { Validation,RoleValidation } = require('../../Validation/Validation')
const { createContract, FindAllContract,EditAllFieldOfContract, FindSingleContract} =require('../Controller/ContractController')

Router.post('/',Validation,RoleValidation('admin'),createContract)
Router.get('/',FindAllContract)
Router.get('/:contractId',FindSingleContract)
Router.put('/:contractId',Validation,RoleValidation('admin'),EditAllFieldOfContract)

module.exports= Router