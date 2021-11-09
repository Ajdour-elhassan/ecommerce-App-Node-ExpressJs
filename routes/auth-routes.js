const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();

// sign-Up Authentication
router.get("/signup", authController.getSignUp);

// ... Sign-up
router.post("/signup", authController.signup);

// ... Sign-IN Authentication
router.get("/login", authController.getLogin);

module.exports = router;
