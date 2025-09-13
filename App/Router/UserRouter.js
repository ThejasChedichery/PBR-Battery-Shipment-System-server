
const express = require('express')
const Router = express.Router()
const {AddingUser,FindAllUser,LogInUser} = require('../Controller/UserController')
const {LoginValidation,Validation, RoleValidation} = require('../../Validation/Validation')

Router.post('/Register',AddingUser)
Router.post('/Login',LoginValidation,Validation,LogInUser)
Router.get('/AllUser',Validation,RoleValidation('admin'),FindAllUser)

module.exports = Router