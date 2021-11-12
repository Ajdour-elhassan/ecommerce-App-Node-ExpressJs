const User = require("../models/user-model");
const authenticationUtil = require("../util/authentication");
const checkUserValidationUtil = require("../util/validation");

// ... signUp
function getSignUp(req, res) {
  res.render("customer/auth/signup");
}

// ... Sign-up ===> Post request
async function signup(req, res, next) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postalcode,
    req.body.city
  );

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
  res.render("customer/auth/login");
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
    res.redirect("/login");
    console.log("email is not matched");
    return;
  }

  const passwordIsCorrect = await user.getMatchedUserPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    res.redirect("/login");
    console.log("password is not correct");
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
