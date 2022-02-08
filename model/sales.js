const mongoose = require("mongoose")

const SalesSchema = new mongoose.Schema({
    fruit_id :{
        type : mongoose.SchemaTypes.ObjectId,
        ref:"Fruits"
    }
})

module.exports=new mongoose.model("sale" , SalesSchema)