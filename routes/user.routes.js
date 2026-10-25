const express = require('express')
const routes = express.Router()

const {getUser } = require('../controller/user.controller')
const {postTask, getTask, deleteTask, editTask, searchTask} = require('../controller/control.controller')

routes.get('/api/tasks/', getUser)
routes.post('/api/tasks/', postTask)
routes.get('/api/tasks/json-data', getTask)
routes.delete('/api/tasks/json-data/:id', deleteTask)
routes.put('/api/tasks/json-data/:id', editTask)
routes.post('/api/tasks/json-data/:search', searchTask)

module.exports=routes