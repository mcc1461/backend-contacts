//: userRoutes.js is a file that contains the routes for the user endpoints.
const express = require("express");

const router = express.Router();

const { registerUser, loginUser, getCurrentUser } = require("../controllers/userController");
const { validateToken } = require("../middleware/validateTokenHandler");



// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private routes
router.get("/current", validateToken, getCurrentUser);

module.exports = router;
