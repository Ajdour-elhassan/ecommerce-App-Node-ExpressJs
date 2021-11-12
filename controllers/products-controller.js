const express = require("express");
// const productController = require("../controllers/product-controller");
const router = express.Router();

router.get("/products", function (req, res) {
  res.render("customer/products/all-products");
});

module.exports = router;
