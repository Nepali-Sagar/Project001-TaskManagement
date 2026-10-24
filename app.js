require('dotenv').config()

const express=require('express')
const connection = require('./config/db')
const taskModel = require('./models/schema')

const userRoutes = require('./routes/user.routes')

const app = express();

app.use('/task', userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Running on http://localhost:${process.env.PORT}`)
})