const express = require("express");
const adminController = require("../controllers/admin-controller");
const router = express.Router();
const configureMulterMiddelware = require("../middelwares/image-upload");

// Admin products management
router.get("/products", adminController.getProducts);

// Admin Add new products
router.get("/products/add-new-product", adminController.getNewProduct);

// Products
router.post(
  "/products",
  configureMulterMiddelware,
  adminController.addNewProduct
);

module.exports = router;
