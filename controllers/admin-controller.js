const Product = require("../models/product-model");

async function getProducts(req, res, next) {
  // ....
  try {
    const AllProducts = await Product.findAllProducts();
    res.render("admin/products/all-products", { allProducts: AllProducts });
  } catch (error) {
    next(error);
    return;
  }
}

// Get
async function getNewProduct(req, res, next) {
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
    const createdProduct = await createNewProduct.saveNewProductData();
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
