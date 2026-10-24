const express = require('express')
const routes = express.Router()

const {getUser} = require('../controller/user.controller')

routes.get('/', getUser)

module.exports=routes