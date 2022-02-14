const res = require("express/lib/response");
const req = require("express/lib/request");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
const responseHandler = require("../helper/responseHandler");
const messages = require("../helper/messages");
const Joi = require("joi")

// requiring joi validator
const {fruitSchema} = require("../Validations/fruitValidator/fruitValSchema")

// requiring models
const Fruits = require("../model/fruits")
const Fruits_props = require("../model/fruitsProperties");
const Sales = require("../model/sales");
const fruits = require("../model/fruits");

// api to create fruit
exports.createFruit=async(req,res)=>{
    const {name , country ,price, count } = req.body
    const validate = await fruitSchema.validate(req.body)
    
    if (validate.error) {
        return responseHandler.handler(res,false, messages.customMessages.error, [], 422)
    }

    try{
        fruit = new Fruits({
            name,
            country,
            price,
            count        
        });
        const new_fruit = await fruit.save()

        return responseHandler.handler(res,true, messages.customMessages.fruitadded, [], 201)
    }catch(error){
        console.log(error)
        return responseHandler.handler(res,false, messages.customMessages.error, [], 500)
    }
}

// api to create fruit properties
exports.createFruitProperties=async(req,res)=>{
    const{fruit_id,colour,smell,taste} = req.body
    try {
        fruit_props = new Fruits_props({
            fruit_id,
            colour,
            smell,
            taste
        });
        const fruit= await fruit_props.save();
        responseHandler.handler(res,true, messages.customMessages.addedFruitProperties, [], 201)
    } catch (error) {
        console.log(error)
        responseHandler.handler(res,false, messages.customMessages.error, [], 500)
    }
}

// api to update fruit
exports.updateFruit=async(req , res)=>{
    const fruitID = req.params.id;
    try {
        const {name , country , count} = req.body;
        const updatedevent = {};
        if (name) updatedevent.name = name;
        if (country) updatedevent.country = country;
        if (count) updatedevent.count= count;
        const event = await Fruits.findByIdAndUpdate(fruitID , { $set : updatedevent} , {new : true});
        res.status(201).json({event});
        responseHandler.handler(res,true, messages.customMessages.updateFruit, [], 201)
    } catch (error) {
        console.log(error);
        responseHandler.handler(res,false, messages.customMessages.error, [], 500)
    }
}

// deleting an fruit
exports.deleteFruit=async(req , res)=>{
    const fruitID = req.params.id;
    try {
      await Fruits.findByIdAndRemove(fruitID);
      responseHandler.handler(res,true, messages.customMessages.deleteFruit, [], 201)
    } catch (error) {
      console.log(error);
      responseHandler.handler(res,false, messages.customMessages.error, [], 500)
    }
  }

// api for sale collection
exports.createSale=async(req,res)=>{
    try {
        const{fruit_id}=req.body
        const{created_at}=req.body
        const sale = new Sales({
            fruit_id,
            created_at
        })
        const new_sales= await sale.save()
        // res.status(201).json({new_sales})
        responseHandler.handler(res,true, messages.customMessages.createSale, [], 201)
    } catch (error) {
        responseHandler.handler(res,false, messages.customMessages.error, [], 500)
    }
}

// api to purchase fruit
exports.purchaseFruit=async(req,res)=>{
    try {
        const fruitObjectId = req.query.id;
        const update = await Fruits.updateOne(
            {"_id" : fruitObjectId} , {$inc:{"count":1}}
        );
        responseHandler.handler(res,true, messages.customMessages.fruitPurchased, [], 201)
    } catch (error) {
        console.log(error)
        responseHandler.handler(res,false, messages.customMessages.error, [], 500)
    }
}

// api for pagination ,sorting and searching
exports.Pagination=async(req,res)=>{
    try {
        let page =  req.query.page; 
        let rowsPerPage =  req.query.rowsPerPage;
        // filter for searching
        let filter =  req.query.filter;

        // for sorting 
        let recordSort =  req.query.recordSort;

        let totalDocuments = await Fruits.count()
        let numberOfPages = Math.floor(totalDocuments / rowsPerPage)

        // for searching   
        let query = {}

        if (filter) {
            query['name'] = filter 
        }
        
        let sort = {name : 1}

        if (recordSort){
            sort[recordSort] = -1
        }

        let skip = (page - 1) * rowsPerPage

        let limit = rowsPerPage

        let data = await Fruits.find(query).sort(sort).skip(skip).limit(limit)

        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({"error" :"internal server error"})
    }
}

// api to join fruits and their properties

exports.fruitWithProperties = async(req,res)=>{
    try {
        let page = req.query.page
        let rowsPerPage =  req.query.rowsPerPage;
        let filter = req.query.filter
        let query = {}
        if (filter) {
            query['name'] = filter 
        }
        let sort = {name : 1}
        let skip = (page - 1) * rowsPerPage
        let limit = +rowsPerPage
        let joinedCollection= await Fruits.aggregate([
            {
                $match:query
            },
            {
                $sort:sort
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $lookup:
                {
                    from:"properties",
                    localField:"_id",
                    foreignField:"fruit_id",
                    as:"Properties"
                }
            },
            {
                $project: {
                    __v: false,
                    Properties: {
                        __v: false,
                        fruit_id: false
                    }
                }
            }
        ])
        responseHandler.handler(res,true, messages.customMessages.fruitWithProperties, joinedCollection, 201)  
    } catch (error) {
        console.log("===>",error)
        responseHandler.handler(res,false, messages.customMessages.error, [], 500)
    }   
}

// api to get fruit sells on specific date range
// exports.fruitSales = async(req,res)=>{
//     try {
//         let sales = await Fruits.aggregate([
//             {
//                 $lookup:
//                 {
//                     from:"Sales",
//                     localField:"_id",
//                     foreignField:"fruit_id",
//                     as:"fruitsales"
//                 }
//             }    
//             ])
//             console.log("====>",sales)
//             res.status(201).json({sales})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({error:"internal server error"})
//     }
// }
// exports.fruitSales = async(req,res)=>{
//     try {
//         let sales = await fruits.aggregate([
//             {
//                 $lookup:
//                 {
//                     from : "sale",
//                     localField: "_id",
//                     foreignField: "fruit_id",
//                     as: "sales"
//                 }
//             }
//         ])

//     } catch (error) {
        
//     }
// }