const express = require("express");
const router = express.Router();

// requiring controllers
const crudController = require("../controllers/crudController")

// routes
router.post("/addfruit",crudController.createFruit)
router.post("/properties" ,crudController.createFruitProperties)
router.put("/:id",crudController.updateFruit)
router.delete("/:id" ,crudController.deleteFruit)
router.post("/sales" ,crudController.createSale)
router.post("/purchase",crudController.purchaseFruit)
router.get("/Pagination",crudController.Pagination)
router.get("/fruitWithProperties",crudController.fruitWithProperties)
router.get("/getsalesdata",crudController.fruitSales)

module.exports = router;
