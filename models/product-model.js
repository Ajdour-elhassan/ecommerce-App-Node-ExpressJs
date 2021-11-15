const db = require("../data/database");

class product {
  constructor(productData) {
    this.title = productData.title;
    this.image = productData.image;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/product/assets/images/${productData.image}`;
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

module.exports = product;
