const path = require("path");
const express = require("express");
const authRoute = require("./routes/auth-routes");
const chalk = require("chalk");
const db = require("./data/database");

const app = express();

// We tell express that we use Ejs
app.set("view engine", "ejs");

// ... Set the Views Path
app.set("views", path.join(__dirname, "views"));

// ... adding Static css style
app.use(express.static("public"));

// ... User Authentication Route
app.use(authRoute);

// Connect with database
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("failed to connect with db");
    console.log(error);
  });

//... Set Port
// app.listen(3000);

// console.log(chalk.blue("Hello world!"));
// console.log(chalk.yellow("the server is running in Port 3000"));
