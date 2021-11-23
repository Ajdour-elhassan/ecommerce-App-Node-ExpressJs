const Cart = require("../models/cart-model");

// Create a default Session cart for User
function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    cart = new Cart(req.session.cart.items);
  }

  // we can use this in Front-End!
  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;
