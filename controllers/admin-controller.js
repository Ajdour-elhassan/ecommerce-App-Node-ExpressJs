const Product = require("../models/product-model");

// Get All products
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

// Get products
async function getNewProduct(req, res, next) {
  // ...
  res.render("admin/products/add-new-product");
}

// Post products
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
    res.redirect("/admin/products");
  } catch (error) {
    next(error);
    return;
  }
}
// Admin Update products :: Get-request
async function getupdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
    return;
  }
}

// Admin Update products :: Post-request
async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    // replace the old image with a new one
    product.replaceImage(req.file.filename);
  }
  try {
    await product.saveNewProductData();
    res.redirect("/admin/products");
    console.log("Product updated successdully!");
  } catch (error) {
    next(error);
    return;
  }
}

// Delete Product
async function RemoveProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.removeProduct();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products", { deleteProduct: deleteProduct });
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  addNewProduct: addNewProduct,
  getupdateProduct: getupdateProduct,
  updateProduct: updateProduct,
  RemoveProduct: RemoveProduct,
};
