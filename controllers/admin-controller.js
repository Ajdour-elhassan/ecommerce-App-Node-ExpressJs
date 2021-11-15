function getProducts(req, res) {
  // ....
  res.render("admin/products/all-products");
}
function getNewProduct() {
  // ...
}

function addNewProduct(req, res) {
  // ...
  res.render("admin/products/add-new-product");
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  addNewProduct: addNewProduct,
};
