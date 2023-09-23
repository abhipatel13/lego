// models/Register.js
const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    dateofbirth: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const RegisterModel = mongoose.model('Register', registerSchema);
module.exports = { RegisterModel }
