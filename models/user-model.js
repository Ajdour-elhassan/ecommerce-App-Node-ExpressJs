const bcrypt = require("bcryptjs");
const db = require("../data/database");

class User {
  // Set Paramters
  constructor(email, password, fullname, street, postalcode, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalcode: postalcode,
      city: city,
    };
  }

  // Find & check user Email
  getUserWithTheSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  // Signup method & store it in db
  async signUp() {
    const hashedPassword = await bcrypt.hash(this.password, 12); // hash password to 12 chraacters!
    const result = await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  // Get Match User Password
  getMatchedUserPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
