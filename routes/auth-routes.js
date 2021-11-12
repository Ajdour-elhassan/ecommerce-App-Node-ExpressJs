const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();

// sign-Up Authentication
router.get("/signup", authController.getSignUp);

// ... Sign-up :: POST Request
router.post("/signup", authController.signup);

// ... login Authentication
router.get("/login", authController.getLogin);

// ... login Authentication :: Post request
router.post("/login", authController.login);

// ... logout
router.post("/logout", authController.logout);

module.exports = router;
