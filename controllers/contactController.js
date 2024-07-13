const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");


//================ Public functions ================//

//@desc Get all contacts
//@route GET /api/contacts
//@access Private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access Private

const createContact = asyncHandler(async (req, res) => {
  console.log("req.body:", req.body);
  const { name, surname, email, phone, country, city } = req.body;
  if (!name || !surname || !email || !phone || !country || !city) {
    return res.status(400).json({ message: "Please enter all fields!" });
  }
  checkContact = await Contact.findOne({email});
  if (checkContact) {
    return res.status(400).json({ message: `Contact with email ${email} already exists!` });
  }

  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    surname,
    email,
    phone,
    country,
    city,
  });
  res.status(201).json({ message: `Contact '${name} ${surname}' created successfully ✅` });
});

//================ Private functions ================//

//@desc Get single contact
//@route GET /api/contacts/:id
//@access Private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: `Contact with id ${req.params.id} not found!` });
  } 
  if (contact.user_id.toString() !== req.user.id.toString()) {
    res.status(403);
    throw new Error("User do not have permission to GET other user contacts");
  }
  res.status(200).json(contact);
});



//@desc Update contact
//@route PUT /api/contacts/:id
//@access Private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact with id ${req.params.id} not found!`);
  }
  if (contact.user_id.toString() !== req.user.id.toString()) {
    res.status(403);
    throw new Error("User do not have permission to UPDATE other user contacts");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(200).json({ message: `Contact '${updatedContact.name} ${updatedContact.surname}' updated successfully...` });  
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access Private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: `Contact with id ${req.params.id} not found!` });
  }
   if (contact.user_id.toString() !== req.user.id.toString()) {
     res.status(403);
     throw new Error(
       "User do not have permission to DELETE other user contacts"
     );
   }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Contact '${deletedContact.name} ${deletedContact.surname}' deleted successfully...` });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
