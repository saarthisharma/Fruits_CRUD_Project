const mongoose = require("mongoose")

const PropertiesSchema =new mongoose.Schema({
    fruit_id :{
        type : mongoose.SchemaTypes.ObjectId,
        ref:"Fruits"
    },
    colour :{
        type : String,
        required:true
    },
    smell :{
        type:String,
        required:true
    },
    taste :{
        type:String,
        required:true
    }
})
module.exports = new mongoose.model("Properties" , PropertiesSchema)