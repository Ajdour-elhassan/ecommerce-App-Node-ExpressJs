const mongodb = require("mongodb");
const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.image = productData.image;
    this.price = +productData.price;
    this.description = productData.description;
    this.updateImageDataPath();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  updateImageDataPath() {
    // We dont store them in db , we need them in front end template
    this.imagePath = `products-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  // Find Product By Id
  static async findById(productId) {
    // Convert product from String to object in Database
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("Could not find product with provided id");
      error.code = 404;
      throw error;
    }
    return new Product(product);
  }

  // Get all products in Database & S  tore them in new Product Class
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

    if (!this.image) {
      delete productData.image;
    }

    // updating product in Dababase
    if (this.id) {
      // mongodb id identification
      const productId = new mongodb.ObjectId(this.id);
      // Updating product by Product Id
      db.getDb()
        .collection("products")
        .updateOne({ _id: productId }, { $set: productData });
    } else {
      const result = await db
        .getDb()
        .collection("products")
        .insertOne(productData);
    }
  }

  async replaceImage(updatedImage) {
    this.image = updatedImage;
    this.updateImageDataPath();
  }

  removeProduct() {
    const productId = new mongodb.ObjectId(this.id);
    return db.getDb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
