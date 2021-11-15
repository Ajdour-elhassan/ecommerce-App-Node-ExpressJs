const express = require("express");
const adminController = require("../controllers/admin-controller");
const router = express.Router();

// Admin products management
router.get("/products", adminController.getProducts);

// Admin Add new products
router.get("/products/add-new-product", adminController.addNewProduct);

// Admin orders management
router.get("/orders", function (req, res) {
  res.render("/admin/orders/admin-orders");
});

module.exports = router;
