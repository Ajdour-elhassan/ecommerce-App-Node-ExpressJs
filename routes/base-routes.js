const express = require("express");
// const baseController = require("../controllers/base-controller");
const router = express.Router();

// ... Home ::: all-products
router.get("/", (req, res) => {
  res.redirect("/products");
});

router.get("/401", (req, res) => {
  res.status(401).render("shared/401");
});

router.get("/403", (req, res) => {
  res.status(403).render("shared/403");
});

module.exports = router;
