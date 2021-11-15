const Product = require("../models/product-model");

function getProducts(req, res) {
  // ....
  res.render("admin/products/all-products");
}

// Get
function getNewProduct(req, res) {
  // ...
  res.render("admin/products/add-new-product");
}

// Post
async function addNewProduct(req, res, next) {
  // ...
  const createNewProduct = new Product({
    ...req.body,
    image: req.file.filename,
  });

  console.log(createNewProduct);

  // ...
  try {
    await createNewProduct.saveNewProductData();
    res.redirect("/admin/products/add-new-product");
  } catch (error) {
    next(error);
    return;
  }
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  addNewProduct: addNewProduct,
};
