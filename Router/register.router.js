// routes/registerRoutes.js
const express = require('express');
const registerRouter = express.Router();
const registerController = require('../Controller/register.controller');

// Route for user registration
registerRouter.post('/auth', registerController.registerUser);

module.exports = registerRouter;

