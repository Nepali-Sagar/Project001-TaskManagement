const mongoose = require('mongoose')

const connections = mongoose.connect(process.env.MONGOOSE_CONNECT).then(()=>{
    console.log("Database is connected successfully")
})

module.exports = connections