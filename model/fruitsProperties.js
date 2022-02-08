const mongoose = require("mongoose")

const PropertiesSchema =new mongoose.Schema({
    fruit_id :{
        type : mongoose.SchemaTypes.ObjectId,
        ref:"Fruits"
    },
    colour :{
        type : String
    },
    smell :{
        type:String
    },
    taste :{
        type:String
    }
})
module.exports = new mongoose.model("Properties" , PropertiesSchema)