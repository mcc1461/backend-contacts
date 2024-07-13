const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts or the user's own contacts
// @route GET /api/contacts
// @access Private (Admin gets all, others get their own)
const getContacts = asyncHandler(async (req, res) => {
  let contacts;
  if (req.user.isAdmin) {
    contacts = await Contact.find(); // Admin gets all contacts
  } else {
    contacts = await Contact.find({ user: req.user.id }); // Regular users get their own contacts
  }
  res.json(contacts);
});

// @desc Create a contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  const contact = new Contact({
    user: req.user.id,
    name,
    email,
    phone,
  });

  const createdContact = await contact.save();
  res.status(201).json(createdContact);
});

// @desc Update a contact
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user.toString() !== req.user.id && !req.user.isAdmin) {
    res.status(401);
    throw new Error("Not authorized to update this contact");
  }

  contact.name = req.body.name || contact.name;
  contact.email = req.body.email || contact.email;
  contact.phone = req.body.phone || contact.phone;

  const updatedContact = await contact.save();
  res.json(updatedContact);
});

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user.toString() !== req.user.id && !req.user.isAdmin) {
    res.status(401);
    throw new Error("Not authorized to delete this contact");
  }

  await contact.remove();
  res.json({ message: "Contact removed" });
});

module.exports = { getContacts, createContact, updateContact, deleteContact };
