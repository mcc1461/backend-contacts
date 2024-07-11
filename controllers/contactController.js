const asyncHandler = require("express-async-handler");

//================ Public functions ================//

//@desc Get all contacts
//@route GET /api/contacts
//@access Public

const getContacts = async (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

//@desc Get single contact
//@route GET /api/contacts/:id
//@access Public

const getContact = async (req, res) => {
  res.status(200).json({ message: `Get contact with id ${req.params.id}` });
};

//================ Private functions ================//

//@desc Create new contact
//@route POST /api/contacts
//@access Private

const createContact = async (req, res) => {
  console.log("req.body:", req.body);
  const { name, surname, email, phone, city } = req.body;
  if (!name || !surname || !email || !phone || !city) {
    return res.status(400).json({ message: "Please enter all fields!" });
  }
  res.status(201).json({ message: "Create contact done..." });
};

//@desc Update contact
//@route PUT /api/contacts/:id
//@access Private

const updateContact = async (req, res) => {
  res.status(202).json({ message: `Update contact with id ${req.params.id}` });
};

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access Private

const deleteContact = async (req, res) => {
  res.status(200).json({ message: `Delete contact with id ${req.params.id}` });
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
