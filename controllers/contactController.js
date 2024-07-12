const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//================ Public functions ================//

//@desc Get all contacts
//@route GET /api/contacts
//@access Public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access Public

const createContact = async (req, res) => {
  console.log("req.body:", req.body);
  const { name, surname, email, phone, country, city } = req.body;
  if (!name || !surname || !email || !phone || !country || !city) {
    return res.status(400).json({ message: "Please enter all fields!" });
  }
  const contact = await Contact.create({
    name,
    surname,
    email,
    phone,
    country,
    city,
  });
  res.status(201).json({ message: `Contact '${name} ${surname}' created successfully ✅` });
};

//================ Private functions ================//

//@desc Get single contact
//@route GET /api/contacts/:id
//@access Public

const getContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: `Contact with id ${req.params.id} not found!` });
  } 
  res.status(200).json(contact);
};



//@desc Update contact
//@route PUT /api/contacts/:id
//@access Private

const updateContact = async (req, res) => {
  const { name, surname, email, phone, country, city } = req.body;
  if (!name || !surname || !email || !phone || !country || !city) {
    return res.status(400).json({ message: "Please enter all fields!" });
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    { name, surname, email, phone, country, city } || req.body,
    { new: true }
  );
  if (!updatedContact) {
    return res.status(404).json({ message: `Contact with id ${req.params.id} not found!` });
  }
  res.status(200).json(updatedContact);
};

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access Private

const deleteContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: `Contact with id ${req.params.id} not found!` });
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Contact ${deletedContact.name} ${deletedContact.surname} deleted successfully...` });
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
