const Fruits = require("../model/fruits")
const Fruits_props = require("../model/fruitsProperties");
const Sales = require("../model/sales")

// api to create fruit
exports.createFruit=async(req,res)=>{
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
}

// api to create fruit properties
exports.createFruitProperties=async(req,res)=>{
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
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "server error"});
    }

}

// deleting an fruit
exports.deleteFruit=async(req , res)=>{
    const fruitID = req.params.id;
    try {
      await Fruits.findByIdAndRemove(fruitID);
      res.status(200).json({ msg: "fruit Removed" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server Error" });
    }
  }

// api for sale collection
exports.createSale=async(req,res)=>{
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
}

// api to purchase fruit
exports.purchaseFruit=async(req,res)=>{
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
}