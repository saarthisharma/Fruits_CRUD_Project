const mongoose = require("mongoose")

const FruitsSchema =new mongoose.Schema({
    name :{
        type : String,
        require:true
    },
    country :{
        type : String,
        require:true
    },
    price :{
        type:Number,
        require:true
    },
    count :{
        type :Number,
        require:true
    }
})

module.exports =new mongoose.model("Fruits" ,FruitsSchema);