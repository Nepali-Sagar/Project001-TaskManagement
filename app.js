require('dotenv').config()

const express=require('express')
const path=require('path')
const connection = require('./config/db')

const userRoutes = require('./routes/user.routes')

const app = express();

app.set("view engine", 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Running on http://localhost:${process.env.PORT}`)
})