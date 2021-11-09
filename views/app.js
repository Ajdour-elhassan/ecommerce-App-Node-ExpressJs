const path = require("path");
const express = require("express");
const authRoute = require("../routes/auth-routes");
// Include Chalk
const chalk = require("chalk");

const app = express();

// We tell express that we use Ejs
app.set("view engine", "ejs");

// ... Set the Views Path
app.set("views", path.join(__dirname, "views"));

// ... adding Static css style
app.use(express.static("public"));

// ... User Authentication Route
app.use(authRoute);

app.listen(3000);

// Display Hello World in the console
console.log(chalk.blue("Hello world!"));
console.log(chalk.yellow("the server is running in Port 300"));
