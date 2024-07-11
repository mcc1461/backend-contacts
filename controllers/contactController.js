//@desc Get all contacts
//@route GET /api/contacts
//@access Public

const getContacts = (req, res) => {
    res.status(200).json({message: "Get all contacts"});
}

//@desc Get single contact
//@route GET /api/contacts/:id
//@access Public

const getContact = (req, res) => {
    res.status(200).json({message: `Get contact with id ${req.params.id}`});
}

//@desc Create new contact
//@route POST /api/contacts
//@access Private

const createContact = (req, res) => {
    res.status(201).json({message: "Create contact"});
}

//@desc Update contact
//@route PUT /api/contacts/:id
//@access Private

const updateContact = (req, res) => {
    res.status(202).json({message: `Update contact with id ${req.params.id}`});
}

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access Private

const deleteContact = (req, res) => {
    res.status(200).json({message: `Delete contact with id ${req.params.id}`});
}

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}

