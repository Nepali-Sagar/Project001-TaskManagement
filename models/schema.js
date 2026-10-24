const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    dueDate: Date,
    createdAt: Date
})

const taskModel = mongoose.model('task', taskSchema)

module.exports = taskModel