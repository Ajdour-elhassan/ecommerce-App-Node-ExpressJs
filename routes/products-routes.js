const express = require("express");
const productsController = require("../controllers/products-controller");
const router = express.Router();

// ... HomePage all-products
router.get("/products", productsController.getAllProducts);

// Product Details
router.get("/products/:id", productsController.getProductDetails);

module.exports = router;
