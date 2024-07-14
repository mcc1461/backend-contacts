const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  createAdminUser,
} = require("../controllers/userController");
const { validateToken, admin } = require("../middleware/validateTokenHandler");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private routes
router.get("/current", validateToken, getCurrentUser);

// Admin-specific route
router.post("/create-admin", validateToken, admin, createAdminUser);

module.exports = router;
