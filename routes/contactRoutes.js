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

router.get("/", getContacts);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
