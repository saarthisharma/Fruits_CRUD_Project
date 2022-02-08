const express = require("express");
const router = express.Router();

// requiring controllers
const crudController = require("../controllers/crudController")

router.post("/addfruit",crudController.createFruit)
router.post("/properties" ,crudController.createFruitProperties)
router.put("/:id",crudController.updateFruit)
router.delete("/:id" ,crudController.deleteFruit)
router.post("/sales" ,crudController.createSale)
router.post("/purchase",crudController.purchaseFruit)

module.exports = router;
