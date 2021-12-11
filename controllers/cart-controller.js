const Product = require("../models/product-model");

async function addItemToCart(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  // set cart variable
  const cart = res.locals.cart;
  // add item to user session cart
  cart.addItemToCart(product);
  // Save cart item in user session cart
  req.session.cart = cart;

  // Successfully added data
  res.status(201).json({
    message: "Cart Updated!",
    newTotalItems: cart.totalQuantity,
  });
}

module.exports = {
  addItemToCart: addItemToCart,
};
