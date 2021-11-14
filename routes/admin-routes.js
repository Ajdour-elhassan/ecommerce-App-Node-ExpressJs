const express = require("express");
// const baseController = require("../controllers/admin-controller");
const router = express.Router();

// Admin products management
router.get("/admin/products", function (req, res) {
  res.render("/admin/products/admin-products");
});

// Admin orders management
router.get("/admin/orders", function (req, res) {
  res.render("/admin/orders/admin-orders");
});

module.exports = router;
