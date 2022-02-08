const mongoose = require("mongoose")

const FruitsSchema =new mongoose.Schema({
    name :{
        type : String
    },
    country :{
        type : String
    },
    price :{
        type:Number
    },
    count :{
        type :Number
    }
})

module.exports =new mongoose.model("Fruits" ,FruitsSchema);