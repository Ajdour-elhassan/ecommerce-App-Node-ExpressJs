const express = require("express");
const adminController = require("../controllers/admin-controller");
const router = express.Router();
const configureMulterMiddelware = require("../middelwares/image-upload");

// Admin get all products management
router.get("/products", adminController.getProducts);

// Admin Get new products
router.get("/products/add-new-product", adminController.getNewProduct);

// Admin Add new products
router.post(
  "/products",
  configureMulterMiddelware,
  adminController.addNewProduct
);

// Update product by id
router.get("/products/:id", adminController.getupdateProduct);

// Update product by id
router.post(
  "/products/:id",
  configureMulterMiddelware,
  adminController.updateProduct
);

// Delete Product
router.delete("/products/:id", adminController.RemoveProduct);

module.exports = router;
