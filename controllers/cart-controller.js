const Product = require("../models/product-model");

async function addToCart(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  // add item to user session cart
  const cart = res.locals.cart;
  cart.addItemToCart(product);
  req.session.cart = cart;

  // Successfully added data
  res.status(201).json({
    message: "Cart Updated!",
    newTotalItems: cart.newTotalIQuantity,
  });
}

module.exports = {
  addToCart: addToCart,
};
