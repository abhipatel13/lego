// routes/registerRoutes.js
const express = require('express');
const signInRouter = express.Router();
const signinController = require('../Controller/signin.controller');

// Route for user registration
signInRouter.post('/auth', signinController.signIn);

module.exports = signInRouter;

