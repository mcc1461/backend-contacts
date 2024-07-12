const express = require("express");

const router = express.Router();

const { registerUser, loginUser, getCurrentUser } = require("../controllers/userController");


// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private routes
router.get("/:id", getCurrentUser);

module.exports = router;
