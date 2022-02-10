const mongoose = require("mongoose")

const FruitsSchema =new mongoose.Schema({
    name :{
        type : String,
        required:true
    },
    country :{
        type : String,
        required:true
    },
    price :{
        type:Number,
        required:true
    },
    count :{
        type :Number,
        required:true
    }
})

module.exports =new mongoose.model("Fruits" ,FruitsSchema);