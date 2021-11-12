const express = require("express");
// const baseController = require("../controllers/base-controller");
const router = express.Router();

// ... Home ::: all-products
router.get("/", (req, res) => {
  res.redirect("/products");
});

module.exports = router;
