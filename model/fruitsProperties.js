const mongoose = require("mongoose")

const PropertiesSchema =new mongoose.Schema({
    fruit_id :{
        type : mongoose.SchemaTypes.ObjectId,
        ref:"Fruits"
    },
    colour :{
        type : String,
        require:true
    },
    smell :{
        type:String,
        require:true
    },
    taste :{
        type:String,
        require:true
    }
})
module.exports = new mongoose.model("Properties" , PropertiesSchema)