const User = require("../models/user-model");
const authenticationUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

// ... signUp
function getSignUp(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      fullname: "",
      street: "",
      city: "",
      postal: "",
    };
  }
  res.render("customer/auth/signup", { inputData: sessionData });
}

// ... Sign-up ::::: Post request
async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postalcode: req.body.postalcode,
    city: req.body.city,
  };
  // Check User Deatil validation
  if (
    !validation.checkUserValidation(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postalcode,
      req.body.city
    ) ||
    !validation.emailsIsConfirmed(req.body.password, req.body["confirm-email"])
  ) {
    // if valadtion failed : pass the messge
    sessionFlash.flashDataSession(
      req,
      {
        errorMessage:
          "Please check your input, password must be at least 8 characters, Post code must be 5 charcaters long!",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  // Create New User
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postalcode,
    req.body.city
  );

  // Check if this Email user is already exists
  try {
    const thisUserIsAlreadyExists = await user.userIsAlreadyExisted();

    if (thisUserIsAlreadyExists) {
      sessionFlash.flashDataSession(
        req,
        {
          errorMessage:
            "user is already exist! try to sign up with another name & email",
          ...enteredData,
        },
        function () {
          console.log(
            "user is already exist! try to sign up with another email"
          );
          res.redirect("/signup");
        }
      );

      return;
    }
  } catch (error) {
    next(error);
    return;
  }

  // SignUp Successully after check all These Valudation above
  try {
    await user.signUp();
    res.redirect("/login");
  } catch (error) {
    next(error);
    return;
  }
}

function getLogin(req, res) {
  // ...
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
}

// login Post request
async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);

  let existingUser;

  try {
    existingUser = await user.getUserWithTheSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    sessionFlash.flashDataSession(
      req,
      {
        errorMessage: "email or password is invalid! please try again",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
        console.log("email or password is invalid");
      }
    );

    return;
  }

  const passwordIsCorrect = await user.getMatchedUserPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataSession(
      req,
      {
        errorMessage: "email or password is invalid! please try again",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
        console.log("password is invalid");
      }
    );

    return;
  }

  // User Session
  authenticationUtil.createUserSession(req, existingUser, function () {
    console.log("login successfuly!");
    res.redirect("/");
  });
}

function logout(req, res) {
  authenticationUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
