// Route.js
const express = require("express");
const router = express.Router();
const { register, login, aadhar_verify } = require("../Controller/Auth");

// Register routes
router.route("/register").post(register);
router.route("/login").post(login);

// Add the Aadhaar verification route
router.route("/aadhar-verify").post(aadhar_verify);


module.exports = router;
