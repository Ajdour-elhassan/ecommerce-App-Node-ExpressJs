const express = require("express");
const cartController = require("../controllers/cart-controller");
const router = express.Router();

router.post("/items", cartController.addItemToCart); // /cart/items

module.exports = router;
