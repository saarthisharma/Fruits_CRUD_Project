const express = require("express");
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const res = require("express/lib/response");
const app = express();
const req = require("express/lib/request");
const ObjectId = mongoose.Types.ObjectId;

const PORT = 3000;

const Fruits = require("./model/fruits")
const Fruits_props = require("./model/fruits_properties");
const Sales = require("./model/sales")


mongoose.connect("mongodb://localhost/Fruits", ()=>{
    console.log("connected")
},error =>{
    console.log(error)
})

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));




// api to create fruit
app.post("/add" , async(req,res)=>{
    const {name , country ,price, count } = req.body
    try{
        fruit = new Fruits({
            name,
            country,
            price,
            count        
        });
        const new_fruit = await fruit.save()
        res.status(201).json({fruit : new_fruit});
    }catch(error){
        console.log(error)
        res.status(500).json({error :"server error"})
    }
});

// api to create fruit properties
app.post("/properties" ,async(req,res)=>{
    // const fruit_id = req.params.id
    const{fruit_id,colour , smell,taste} = req.body
    try {
        fruit_props = new Fruits_props({
            fruit_id,
            colour,
            smell,
            taste
        });
        const fruit= await fruit_props.save();
        res.status(201).json({fruit_props :fruit});
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "server error"})
    }
});


// api to update fruit
app.put("/:id", async(req , res)=>{
    const fruitID = req.params.id;
    try {
        const {name , country , count} = req.body;
        const updatedevent = {};
        if (name) updatedevent.name = name;
        if (country) updatedevent.country = country;
        if (count) updatedevent.count= count;

        const event = await Fruits.findByIdAndUpdate(fruitID , { $set : updatedevent} , {new : true});
        res.status(201).json({event});
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "server error"});
    }

})


// api to insert price
// app.post("/addPrice" , async(req,res)=>{
//     try {
//         const fruit_id = req.params.id;
//         const {price} = req.body
//         const updatePrice = {};
//         if(price) updatePrice.price = price;
//         console.log("=====>",updatePrice)
//         const update = await Fruits.updateOne(
//             fruit_id , {$set:updatePrice},{upsert : true}
//         );
//         res.status(201).json({update})
//     } catch (error) {
//         res.status(500).json({error : "server error"});
//     }
// })

// api for making count = 0
// app.post("/count" , (req,res)=>{
//     try {
//         const fruitID = req.params.id;
//         const update_many =Fruits.findByIdAndUpdate(
//             {fruitID},
//             {$set:{"count":"req.body"}}
//             )
//             res.status(201).json({update_many})
//     } catch (error) {
//         res.status(500).json({error : "server error"});
//     }
// })

// deleting an fruit
app.delete("/:id" , async(req , res)=>{
    const fruitID = req.params.id;
    try {
      await Fruits.findByIdAndRemove(fruitID);
      res.status(200).json({ msg: "fruit Removed" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server Error" });
    }
  });


// api for sale collection
app.post("/sales" , async(req,res)=>{
    try {
        const{fruit_id}=req.body
        const sale = new Sales({
            fruit_id
        })
        const new_sales= await sale.save()
        res.status(201).json({new_sales})
    } catch (error) {
        res.status(500).json({error:"server error"})
    }
})


// api to purchase fruit
app.post("/purchase" , async(req,res)=>{
    try {
    const fruit_object_id = "620236c7f9179c3408687d10";
        const upa = await Fruits.updateOne(
            {"_id" : fruit_object_id} , {$inc:{"count":1}}
        );
        console.log("upa--->", upa);
        res.status(201).json("count is increment by 1")
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "server error"})
    }
})


app.listen(PORT, () =>{
    console.log(`server is running at http://localhost:${PORT}`)
})
