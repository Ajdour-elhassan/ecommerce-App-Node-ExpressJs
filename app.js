const path = require("path");
const express = require("express");
const chalk = require("chalk");
const db = require("./data/database");
const csrf = require("csurf");
const expressSession = require("express-session");
const createSessionConfig = require("./config/session");
const addCsrfTokenMiddlware = require("./middelwares/csrf-token");
const errorHandlerMiddlware = require("./middelwares/error-hanlder");
const checkAuthStatusMiddlware = require("./middelwares/check-auth");
const authRoute = require("./routes/auth-routes");
const productsRoute = require("./routes/products-routes");
const baseRoute = require("./routes/base-routes");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ... adding Static css style
app.use(express.static("public"));

//  ... Set Middleware express function
app.use(
  express.urlencoded({
    extended: false,
  })
);

// use Session express config
const sessionConfiguraion = createSessionConfig();
app.use(expressSession(sessionConfiguraion));

// ... csurf
app.use(csrf());

// Use Token middlware
app.use(addCsrfTokenMiddlware);

// Check User Status if is Authenticated
app.use(checkAuthStatusMiddlware);

// ... User Authentication Route
app.use(authRoute);
// ... Home page
app.use(baseRoute);
// ... Products route
app.use(productsRoute);

// ... Adding Error Handler Middelware to find & catch any error
app.use(errorHandlerMiddlware);

// Connect with database & listen only if Db is succefully connected!
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
    console.log(
      chalk.blue("Hello! Db is connected Successfuly & running in port 3000!")
    );
    console.log(chalk.yellow("the server is running in Port 3000"));
  })
  .catch(function (error) {
    console.log("failed to connect with db");
    console.log(error);
  });
