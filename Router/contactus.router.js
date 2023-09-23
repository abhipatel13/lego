// routes/registerRoutes.js
const express = require('express');
const contactUsRouter = express.Router();
const contactUsController = require('../Controller/contactus.controller');
const authMiddleware = require('../Middleware/authMiddleware');

// Route for user registration
contactUsRouter.post('/submit' , authMiddleware, contactUsController.contactUs);

module.exports = contactUsRouter;

