require('dotenv').config()

const express=require('express')
const connection = require('./config/db')
const taskModel = require('./models/schema')

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to the page")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Running on http://localhost:${process.env.PORT}`)
})