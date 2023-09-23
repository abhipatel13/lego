// models/Register.js
const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const ContactModel = mongoose.model('Contactus', contactUsSchema);
module.exports = { ContactModel }
