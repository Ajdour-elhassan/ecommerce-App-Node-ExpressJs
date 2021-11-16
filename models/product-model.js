const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.image = productData.image;
    this.price = +productData.price;
    this.description = productData.description;
    // We dont store them in db , we need them in front end template
    this.imagePath = `products-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  // Get all products in Database & Store them in new Product Class
  static async findAllProducts() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map((productDocument) => {
      return new Product(productDocument);
    });
  }

  async saveNewProductData() {
    const productData = {
      title: this.title,
      image: this.image,
      summar: this.summary,
      price: this.price,
      description: this.description,
    };
    const result = await db
      .getDb()
      .collection("products")
      .insertOne(productData);
  }
}

module.exports = Product;
