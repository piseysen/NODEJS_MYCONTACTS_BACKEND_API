const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user._id });
    res.status(200).json(contacts);
});

//@desc Create a contact
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
    console.log('The request body is: ', req.body);
    const { name, email, phone} = req.body;
    const user_id = req.user._id; 
    console.log('User ID:', user_id); 
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('Please provide name, email and phone');
    }
    const contact = new Contact({
        name,
        email,
        phone,
        user_id: user_id
    });
    await contact.save();
    res.status(201).json(contact);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access Public
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('User dont have permission to update this contact');
    }
    
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    )

    res.status(200).json(updateContact);
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log('The contact is: ', contact);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('User dont have permission to delete this contact');
    }

    await contact.deleteOne({ _id: req.params.id });
    
    res.status(200).json({ message: 'Contact removed' });
});

module.exports = {
    getContact,
    createContact,
    getContactById,
    updateContact,
    deleteContact
};