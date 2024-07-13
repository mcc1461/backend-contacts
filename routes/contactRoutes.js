const express = require("express");
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { validateToken } = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken); // Protect all routes

router.get("/", getContacts); // Ensure getContacts is correctly imported
router.post("/", createContact); // Ensure createContact is correctly imported
router.put("/:id", updateContact); // Ensure updateContact is correctly imported
router.delete("/:id", deleteContact); // Ensure deleteContact is correctly imported

module.exports = router;
