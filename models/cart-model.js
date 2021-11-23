class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItemToCart(product) {
    const cartItems = {
      product: product,
      quntity: 1,
      totalPrice: product.price,
    };
    // Updating the cart if An Items is already exists
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItems.quntity = cartItems.quntity + 1;
        cartItems.totalPrice = cartItems.totalPrice + product.price;
        this.items[i] = cartItems;

        // Update totalQuantity
        this.totalQuantity = this.totalQuantity + 1; // this.totalQuantity++;
        this.totalPrice = this.totalPrice + product.price;
        return;
      }
    }

    this.items.push(cartItems);
    // Update totalQuantity
    this.totalQuantity = this.totalQuantity + 1; // this.totalQuantity++;
    this.totalPrice = this.totalPrice + product.price;
  }
}

module.exports = Cart;
